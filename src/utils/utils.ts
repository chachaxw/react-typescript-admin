import pathToRegexp from 'path-to-regexp';

/**
 * Transfer url to url list
 * Example:
 *  '/userinfo/2019/id' => ['/userinfo', '/useinfo/2019, '/userindo/2019/id']
 *
 * @param {string} url
 * @return {string[]}
 */
export function urlToList(url: string): string[] {
  const urlList = url.split('/').filter((i: string) => i);
  return urlList.map((item: string, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}

/**
 * Recursively flatten the data
 * Example:
 *  [{path: string}, {path: string}] => {path1, path2}
 *
 * @param {array} menu
 * @return {string[]}
 */
export function getFlatMenuKeys(menu: any[]): string[] {
  let keys: any[] = [];
  menu.forEach((item: any) => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
}

/**
 * Get menu matches
 * @param {array} flatMenuKeys
 * @param {string[]}
 */
export function getMenuMatches(flatMenuKeys: string[], path: string): string[] {
  const menus = flatMenuKeys.filter((item: string) => {
    if (!item) {
      return [];
    }
    return pathToRegexp(item).test(path);
  });
  return menus;
}

/**
 * Get default collapsed sub menus
 *
 * @param {string} pathname
 * @param {string[]} flatMenuKeys
 * @return {string[]}
 */
export function getDefaultCollapsedSubMenus(pathname: string, flatMenuKeys: string[]): string[] {
  const subMenus = urlToList(pathname)
    .map((item: string) => getMenuMatches(flatMenuKeys, item)[0])
    .filter((item: string) => item)
    .reduce((acc: any, curr: any) => [...acc, curr], ['/']);

  return subMenus;
}

/**
 * Transfer number to `x小时 y分 z秒`
 * @param {number} num
 * @return {string}
 */
export function formatSeconds(num: number): string {
  if (!num) {
    return '';
  }

  const minutes = ~~((num / 60) % 60);
  const hours = ~~(num / (60 * 60));
  const seconds = ~~(num % 60);

  return `${hours > 0 ? hours + '小时' : ''}${minutes > 0 ? minutes + '分' : ''}${seconds > 0 ? seconds + '秒' : ''}`;
}

/**
 * 判断对象或者数组是否为空
 * @param {array | object} obj
 */
export function isEmpty(obj: any): boolean {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;
}
