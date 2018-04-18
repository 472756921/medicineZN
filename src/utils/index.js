//拼接get方法参数
// @data 参数（必须是对象）
export const getParmas = (url, data) => {
  let sendUrl = url;
  let i = 0;
  for (let it in data){
    if(i == 0){
      sendUrl+='?'+it+'='+data[it];
    }else {
      sendUrl+='&'+it+'='+data[it];
    }
    i++;
  }
  return sendUrl;
}
