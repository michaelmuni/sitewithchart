module.exports = {
    isEmail: data => {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(
        String(data)
          .toLowerCase()
          .trim()
      );
    },
    isName: data => {
      const regex = /^[a-zA-Z. ]+$/;
      return regex.test(String(data).trim());
    },
    isPassword: data => {
      return String(data).length >= 8 ? true : false;
    },
    isNumber: data => {
      const regex = /^\d+$/;
      return regex.test(String(data).trim());
    }
  };