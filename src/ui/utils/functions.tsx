const leftJustify = (str, length, char ) => {
    var fill = [];
    while ( fill.length + str.length < length ) {
      fill[fill.length] = char;
    }
    return fill.join('') + str;
}

const rightJustify = (str, length, char ) => {
    var fill = [];
    while ( fill.length + str.length < length ) {
      fill[fill.length] = char;
    }
    return str + str.join('');
}

export const toTimer = (time) => {
    return `${leftJustify(Math.floor(time/3600).toLocaleString(), 2, "0")}:${leftJustify((Math.floor(time/60)%60).toLocaleString(), 2, "0")}:${leftJustify((time%60).toLocaleString(), 2, "0")}`
}