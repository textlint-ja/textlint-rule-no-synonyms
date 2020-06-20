const kanNumbers = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
export const isNumberString = (str: string): boolean => {
    return /\d/.test(str) || kanNumbers.includes(str);
};
