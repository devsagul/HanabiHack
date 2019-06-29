function solve(args) {
    let strNumbers = args[0].split(' '),
        max = +strNumbers[0];

    for(let i in strNumbers) {
        if (max < +strNumbers[i]) {
            max = +strNumbers[i];
        }
    }    
    console.log(max);
}
solve(['8 3 6'])