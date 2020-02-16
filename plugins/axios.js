import { Message } from "element-ui";
export default data => {
  data.$axios.onError(err => {
    const { statusCode, message } = err.response.data;
    if (statusCode === 400) {
      Message.warning(message);
    }
    if (statusCode === 401 || statusCode === 403) {
        console.log(data);
        
      data.redirect(200,"/user/login",{returnUrl : data.route.fullPath});
    }
  });
};
