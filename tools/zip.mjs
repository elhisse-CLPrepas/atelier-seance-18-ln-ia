import fs from 'node:fs/promises';
import path from 'node:path';
// Small, dependency-free ZIP writer (stored entries, UTF-8 names, CRC-32).
const table=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0});
const crc=buffer=>{let n=0xffffffff;for(const b of buffer)n=table[(n^b)&255]^(n>>>8);return (n^0xffffffff)>>>0};
export async function zipDirectory(source,destination,rootName=path.basename(source)){
  const entries=[];
  async function walk(dir,prefix){for(const entry of (await fs.readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){if(entry.name.startsWith('.'))continue;const name=prefix+'/'+entry.name,p=path.join(dir,entry.name);if(entry.isDirectory())await walk(p,name);else if(entry.isFile())entries.push({name,content:await fs.readFile(p)})}}
  await walk(source,rootName);const chunks=[],directory=[];let offset=0,size=0;
  for(const entry of entries){const name=Buffer.from(entry.name),content=entry.content,checksum=crc(content),local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(0x800,6);local.writeUInt16LE(33,12);local.writeUInt32LE(checksum,14);local.writeUInt32LE(content.length,18);local.writeUInt32LE(content.length,22);local.writeUInt16LE(name.length,26);chunks.push(local,name,content);
    const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt16LE(0x800,8);central.writeUInt16LE(33,14);central.writeUInt32LE(checksum,16);central.writeUInt32LE(content.length,20);central.writeUInt32LE(content.length,24);central.writeUInt16LE(name.length,28);central.writeUInt32LE(offset,42);directory.push(central,name);offset+=local.length+name.length+content.length;size+=central.length+name.length;
  }
  const end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(entries.length,8);end.writeUInt16LE(entries.length,10);end.writeUInt32LE(size,12);end.writeUInt32LE(offset,16);await fs.mkdir(path.dirname(destination),{recursive:true});await fs.writeFile(destination,Buffer.concat([...chunks,...directory,end]));
}
