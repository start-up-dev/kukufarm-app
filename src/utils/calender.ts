export const getFullDate = (timestamp: number) => {
  var dt = new Date(timestamp);
  let year = dt.getFullYear();
  let month = (dt.getMonth() + 1).toString().padStart(2, '0');
  let day = dt.getDate().toString().padStart(2, '0');
  return year + '-' + month + '-' + day;
};

export const filterCheckInData = (datas: number) => {
  const transformed = Object.values(datas).reduce(function (acc, obj) {
    let key = getFullDate(obj.createdAt);
    // console.log(key);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  return Object.keys(transformed).map(el => {
    return {
      title: el,
      data: transformed[el],
    };
  });
};
