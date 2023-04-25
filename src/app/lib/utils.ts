export default class Utils {
  static formatDate(d: Date) {
    return d.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).replace(/\//g, '-');
  }
}
