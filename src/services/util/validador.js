class Validador{

    formatNumber(e){
        if((e.which >= 48 && e.which <= 57) 
            || (e.which >= 96 && e.which <= 105)
            || (e.which === 8)
            || (e.which === 37)
            || (e.which === 39)
            || (e.which === 46)){
                                if(e.target.value.length === 1 && e.which !== 8 && e.which !== 37 && e.which !== 39 && e.which !== 46) e.target.value = "(" + e.target.value;
                                if(e.target.value.length === 3 && e.which !== 8 && e.which !== 37 && e.which !== 39 && e.which !== 46) e.target.value = e.target.value + ")";
                                if(e.target.value.length === 9 && e.which !== 8 && e.which !== 37 && e.which !== 39 && e.which !== 46) e.target.value = e.target.value + "-";
      } else {
        e.target.value = e.target.value.substring(0, (e.target.value.length - 1));
      }
    };

    formatJustNumber(e){
      if((e.which >= 48 && e.which <= 57) 
          || (e.which >= 96 && e.which <= 105)
          || (e.which === 8)
          || (e.which === 37)
          || (e.which === 39)
          || (e.which === 46)){
    } else {
      e.target.value = e.target.value.substring(0, (e.target.value.length - 1));
    }
  };
  }

  export default new Validador();