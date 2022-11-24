import { Language } from 'types/language';

export const loginRegisterOptions = (language: Language) => ({
  required: language === 'EN' ? 'Enter login' : 'Введите логин',
  minLength: {
    value: 4,
    message: language === 'EN' ? 'Minimum four characters' : 'Минимум четыре символа',
  },
  pattern: {
    value: /^[a-zA-Z\d]*$/,
    message: language === 'EN' ? 'Only latin letters and digits' : 'Только латинские буквы и цифры',
  },
});

export const passwordRegisterOptions = (language: Language) => ({
  required: language === 'EN' ? 'Enter password' : 'Введите пароль',
  minLength: {
    value: 8,
    message: language === 'EN' ? 'Minimum eight characters' : 'Минимум восемь символов',
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/,
    message:
      language === 'EN'
        ? 'Only latin letters and digits, minimum one digit, one capital and one lowercase'
        : 'Только латинские буквы и цифры, минимум одна цифра, одна заглавная и одна строчная',
  },
});

export const nameRegisterOptions = (language: Language) => ({
  required: language === 'EN' ? 'Enter your name' : 'Введите ваше имя',
  pattern: {
    value: /^[a-zA-Zа-яА-Я ]*$/,
    message: language === 'EN' ? 'Only letters and space' : 'Только буквы и пробел',
  },
});
