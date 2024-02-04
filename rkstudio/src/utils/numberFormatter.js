export const numberFormatter = (number) => {
    if (typeof number === 'number') {
        return number.toFixed(1);
    }

    return number; // 이 부분도 수정되어야 합니다.
};