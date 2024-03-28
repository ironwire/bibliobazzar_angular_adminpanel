export function autofocus(name: string) {
  var element = <any>document.querySelector(`input[name="${name}"]`);
  if (element) {
    setTimeout(() => element.focus(), 0);
  }
}
