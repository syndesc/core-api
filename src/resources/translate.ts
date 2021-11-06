const en = [
    'No token was sent!',
    'Invalid token!',
    'Invalid or expired tokend',
    'Verify your email',
    'Use this link to verify your email',
    'Don\'t share your link. Nobody will ask for your verification link!',
    'User not found!',
    'Wrong email or password',
    'An error ocurred!',
    'No file was sent!'
];
const pt = [
    'Nenhum token foi encontrado!',
    'Token inválido!',
    'Token inválido ou expirado!',
    'Verifique seu e-mail',
    'Use o link para verificar seu e-mail',
    'Não compartilhe esse link. Ninguém vai pedir isso para você.',
    'Usuário não encontrado!',
    'E-mail ou senha incorretos!',
    'Ocorreu um erro!',
    'Nenhum arquivo foi enviado!'
];

export default function translate(lang: string, key: number) {
    return lang === 'pt' ? pt[key] : en[key];
}
