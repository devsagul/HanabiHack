#!/usr/bin/env node

let NBT = require('./index');

if (process.argv.length > 2) {
    let filename = process.argv[2];
    let nbtData = NBT.loadNBTFile(filename);

    // NBT.printTag(nbtData);
    let json = NBT.jsonifyTag(nbtData);

    console.log(JSON.stringify(json, null, 2));
}
