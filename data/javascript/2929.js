var Chocolate = (function (myModel) {
    
    console.log("Chocolate ==> blockPage.js");
    
    "use strict";
    
    /**
     * createURL
     * 
     * Получает значение адресной строки,
     * возращая host страницы
     * 
     * createURL("http://google.com/g1231"); http://google.com/*
     * 
     * @param   {string} str URL страници
     * @returns {string} Адрес сайта
     */
    
    function createURL(url){
        
        if(!url){
            return console.error("createURL - Передано пустое значение!");
        }
        
        if(!(OPTIONS.PATTERN_URL).test(url)){
            return console.error("createURL - не валидно url");
        }
        
        var parser = document.createElement('a');
        parser.href = url;
    
        return parser.protocol + "//"+parser.hostname+"/*";
    }
    
    /**
     * addChromeURL
     * 
     * Заносит значение в Local Storage 
     * если в storage нет объекта block, создается новая запись,
     * после внесения записи расширение перезапускается
     * 
     * addChromeURL("поиск google", "http://google.com/g1231")
     * 
     * @param {string} key   Описание страници
     * @param {string} value Адрес страницы
     */
    function addChromeURL(key, value){
        
        if(!key && !value){
            return console.error("addChromeURL - передано key:"+key+" value:"+value);
        }
        
        //строка в объект JavaScript
        var localBlock = JSON.parse(localStorage.getItem(OPTIONS.STORAGE_NAME));
        
        //при пустом значении localBlock
        if(!localBlock){
            
            var blockStringLocal = '{"'+key+'": "'+value+'"}';
            
            // занесено первое значение в local Stroage
            return localStorage.setItem(OPTIONS.STORAGE_NAME, blockStringLocal);
        }
        
        localBlock[key] = value;
        
        return localStorage.setItem(OPTIONS.STORAGE_NAME, JSON.stringify(localBlock));
        
        
        
        /*
        
        CHROMESTO.getStorage(OPTIONS.STORAGE_NAME, function(block){
            
            console.log(block);
            
            //при пустом значении block
            if(!block){
                
                var block = '{"block":{"'+key+'": "'+value+'"}}';
                block = JSON.parse(block);   
                
                CHROMESTO.setStorage(block, function(){
                  
                    // Перезапуск
                    
                    chrome.runtime.reload();
                });
                
                return;
            }
          
            block[key] = value;
        
            CHROMESTO.setStorage({block: block}, function(){
                
                // Перезапуск
            
                chrome.runtime.reload();
            });
          
        });
        */
        
    };

    
    /**
     * blockPage
     * 
     * Обработка выбора блокировки страницы сайт или страница
     * 
     * Chocolate.blockPage("google", http://google.com/, "site")
     * 
     * @param   {string}   key   Ключ записи(описание) 
     * @param   {string}   value URL страницы
     * @param   {string}   query выбор блокировки (страница или сайт)
     * @returns {function} addChromeURL(key, value)
     */
    myModel.blockPage = function(key, value, query){
        
        if(!query){
            return console.error("blockPage - передано query:"+query);
        }
        
        if(query === "url"){
            return addChromeURL(key, value);
        }
        
        if(query === "site"){
            return addChromeURL(key, createURL(value));
        }
        
    };

    return myModel
    
}(Chocolate || {}));