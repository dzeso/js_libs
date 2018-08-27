function getRecordTimeFromStamp(payload) {
    //  console.log ("getRecordTimeFromStamp", payload);
      const date = new Date(+payload.timestamp-new Date().getTimezoneOffset()*60000).toISOString();
      
      if (payload.mode == "hh:mm") return date.slice(0,16)
      else if (payload.mode == "hh:mm:s0") return date.slice(0,18)+"0"
      else if (payload.mode == "hh:mm:ss") return date.slice(0,19);
      
      return date.slice(11,16);
    }
    
    function getNextMoment(payload) {
    
      let interval = 60;
      if (payload.mode == "hh:mm:s0") interval = 10
      else if (payload.mode == "hh:mm:ss") interval = 1;
    //  console.log ("getNextMoment", payload, interval);
    //  console.log ("getNextMoment", 1000*interval, Date.parse(payload.date));
      return getRecordTimeFromStamp({
        timestamp: (1000*interval + Date.parse(payload.date)),
        mode: payload.mode
        });
    }
    
    function getDataFromISODate(payload) {
      if (payload.mode == "hh:mm") return payload.data.slice(11,16)
      else if (payload.mode == "hh:mm:s0") return payload.data.slice(11,18)+"0"
      else if (payload.mode == "hh:mm:ss") return payload.data.slice(11,19);
      return payload.data;
    }