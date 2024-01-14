export const errorMessage = {
  IsNotEmpty: 'Поле обязательно для заполнения',
  IsString: 'Поле должно быть строкой',
  IsEmail: 'Неверный формат почты',
  ServerError: 'Сервер не отвечает',
  LoginError: 'Почта или пароль неверный',
  UserWithEmailExist: 'Пользователь с таким email уже существует',
  Unauthorized: 'Доступ запрещен',
  UserNotFound: 'Пользователь не найден',
  PasswordError: 'Пароль неверный',
  PasswordsMatch: 'Пароли совпадают',
  MailerError: 'Почтовый сервис временно не доступен. Повторите попытку позже',
  IncorrectCode: 'Неверный код',
  ExpiredCode: 'Срок действия кода истек',
  Length: (min, max) => `Поле должно быть от ${min} до ${max} символов`,
};
