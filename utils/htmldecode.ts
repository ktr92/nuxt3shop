export function decodeHtmlCharCodes(htmlStr: string) {
  htmlStr = htmlStr.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "\'").replace(/&amp;/g, "&");
  return htmlStr;

}