export const getRandomVid = (vidListLen: number) => {

    return Math.floor((Math.random() * vidListLen));
}

export const getFormattedDate = (timeStamp: number): string => {

    const postedDate = new Date(timeStamp);
    postedDate.toLocaleDateString('en-US');
     
    let day = postedDate.getDate() + "";
    let month: any = postedDate.getMonth() + "";
    let year = postedDate.getFullYear() + "";
    // let hoursInSeconds = postedDate.getHours()*3600;
    // let minutesInSeconds = postedDate.getMinutes()*60;
    // let seconds = postedDate.getSeconds();
  
    if (postedDate.getMonth()/10 < 1 ) {
        month++;
        month = "0" + month;
    }
    if (postedDate.getDate()/10 < 1 ) {
        day = "0" + day;
    }
    return `${month}/${day}/${year}`;
  } // end getFormatedDate function

