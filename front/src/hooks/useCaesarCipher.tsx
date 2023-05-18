

export function useCaesarCipher( shift: number, str: string): string {
    // если сдвиг больше 26, то он становится эквивалентным сдвигу на меньшее количество символов
    shift = shift % 26;
    // преобразуем входную строку в массив символов
    let chars = str.split( "" );
    // создаем пустую строку для результата
    let result = "";
    // проходим по каждому символу в массиве
    for ( let i = 0; i < chars.length; i++ ) {
        // получаем ASCII-код символа
        let charCode = chars[ i ].charCodeAt(0);
        // если символ является буквой английского алфавита (от A до Z или от a до z)
        if ( charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 ) {
            // определяем новый код символа с учетом сдвига
            let newCharCode = charCode + shift;
            // если новый код символа находится за пределами диапазона кодов букв английского алфавита
            if ( newCharCode > 90 && newCharCode < 97 || newCharCode > 122 ) {
                // корректируем новый код символа на соответствующий код символа алфавита
                newCharCode = newCharCode - 26;
            } else if ( newCharCode < 65 ) {
                newCharCode = newCharCode + 26;
            }
            // преобразуем новый код символа в символ и добавляем его к результату
            result += String.fromCharCode( newCharCode );
        } else {
            // если символ не является буквой английского алфавита, просто добавляем его к результату
            result += chars[ i ];
        }
    }
    // возвращаем зашифрованный текст
    return result;
}