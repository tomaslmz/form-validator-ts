const SHOW_ERROR_MESSAGE = 'show-error-message';
const ERROR_MESSAGE = 'error-message';

const form = document.querySelector('.form') as HTMLFormElement;
const username = document.getElementById('username') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const confirmPassword = document.getElementById(
  'password2',
) as HTMLInputElement;

function checkForEmptyInputs(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value) {
      showErrorMessage(input, 'Campo vazio!');
    }
  });
}

function hideErrorMessages() {
  const messages = document.querySelectorAll(
    '.' + SHOW_ERROR_MESSAGE,
  ) as NodeListOf<Element>;

  messages.forEach((message) => {
    message.classList.remove(SHOW_ERROR_MESSAGE);
    message.classList.add(ERROR_MESSAGE);
  });
}

function showErrorMessage(input: HTMLInputElement, msg: string) {
  const formFields = input.parentElement as HTMLDivElement;
  const messageField = formFields.querySelector(
    '.error-message',
  ) as HTMLSpanElement;
  messageField.innerText = msg;
  messageField.classList.add(SHOW_ERROR_MESSAGE);
  messageField.classList.remove(ERROR_MESSAGE);
}

function checkPassword(
  password: HTMLInputElement,
  confirmPassword: HTMLInputElement,
): void {
  if (password.value !== confirmPassword.value) {
    showErrorMessage(password, 'As senhas não batem');
    showErrorMessage(confirmPassword, 'As senhas não batem');
  }
}

function shouldSendForm(form: HTMLFormElement): boolean {
  let send = true;
  form.querySelectorAll('.' + SHOW_ERROR_MESSAGE).forEach(() => (send = false));

  return send;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  hideErrorMessages();
  checkForEmptyInputs(username, email, password, confirmPassword);
  checkPassword(password, confirmPassword);
  if (shouldSendForm(form)) {
    alert('FORMULÁRIO ENVIADO!');
  }
});
