const pageState ={
    load: "load",
    pop: "pop",
};

const historyState ={
    initial: "initial",
    replace: "replace",
    f0f: "g",
    route: "route",
    pop: "pop",
};

const supportedLanguages_regexPattern=/^(en|zh|ru|es|tr|fa|fr|de|ja|vi|pt|ar|it|id|el|pl|nl|ko|km|uk|hr|fi|no|sv|lt|cs|da|ab|aa|af|ak|sq|am|ar|an|hy|as|av|ae|ay|az|bm|ba|eu|be|bn|bh|bi|bs|br|bg|my|ca|ch|ce|ny|cv|kw|co|cr|dv|dz|eo|et|ee|fo|fj|ff|gl|gd|gv|ka|kl|gn|gu|ht|ha|he|hz|hi|ho|hu|is|io|ig|in|id|ia|ie|iu|ik|ga|jv|kl|kn|kr|ks|kk|ki|rw|rn|ky|kv|kg|ku|kj|lo|la|lv|li|ln|lu|lg|lb|gv|mk|mg|ms|ml|mt|mi|mr|mh|mo|mn|na|nv|ng|nd|ne|nb|nn|ii|oc|oj|cu|or|om|os|pi|ps|pa|qu|rm|ro|se|sm|sg|sa|sr|sh|st|tn|sn|ii|sd|si|ss|sk|sl|so|nr|su|sw|tl|ty|tg|ta|tt|te|th|bo|ti|to|ts|tk|tw|ug|ur|uz|ve|vo|wa|cy|wo|fy|xh|ji|yi|yo|za|zu)$/;


class Router {
    constructor() {
        if (!Router.instance) {
            //console.log("Constructing -> Router");
            this.Language_URLparameter = "en";
            this.counter_pages = 0;
            this.initializer();
            //return this instance
            Router.instance = this;
        }
        return Router.instance;
    }
    // [ Private Methods ] ---------------------------------------------------------------------------------------
    #fetchAsyncData(url) {
        //console.log(`fetchAsyncData ${url}`)
        async function getData(url) {
            const response = await fetch(url, {cache: "no-cache"});
            if (!response.ok) { return false; }
            const data = await response.text();
            return data;
        }
        return getData(url);
    }
    #downloadView(view, hs, rv){
        var response_View = this.#fetchAsyncData(`YOUR_WEB_DOMAIN/app/lib/presentationLayer/Views/${view}`);
        response_View
            .then((result) => {
                if(result != false){
                    this.#loadView(result, hs, rv);
                }
                else{
                    // fallback
                    window.history.replaceState({}, "notebook", `/notebook/`);
                    this.#downloadView("NotebookView.php", historyState.replace, "/notebook/");
                    return; 
                }
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    }
    #loadView(view, hs, rv){

        const SwiftCS = new SwiftUI();
        SwiftCS.appLoading();
        SwiftCS.createView(view, document.getElementById("App"));

        // Get the div element by class and ID
        const customDataDiv = document.getElementById("customDataDiv");

        // Extract the data variables
        const url         = customDataDiv.getAttribute('data-url');
        const pageName    = customDataDiv.getAttribute('data-pagename');
        const title       = customDataDiv.getAttribute('data-title');
        const description = customDataDiv.getAttribute('data-description');
        const application = customDataDiv.getAttribute('data-application');
        const languages   = customDataDiv.getAttribute('data-languages');
        const robots      = customDataDiv.getAttribute('data-robots');
        const rating      = customDataDiv.getAttribute('data-rating');

        // Assign SEO elements
        document.title = `${title} | ${application}`;
        document.querySelector('meta[name="title"]').setAttribute("content", `${title} | ${application}`);
        document.querySelector('meta[name="description"]').setAttribute("content", `${description}`);
        document.querySelector('meta[name="robots"]').setAttribute("content", robots);
        document.querySelector('meta[name="rating"]').setAttribute("content", rating);
        document.querySelector("link[property='application_ol']").setAttribute("href",`../src/assets/favicons/applications/${application}/favicon32.png`);
        document.querySelector("link[property='application_ne']").setAttribute("href",`../src/assets/favicons/applications/${application}/favicon.svg`);
        document.querySelector("link[property='application_mi']").setAttribute("href",`../src/assets/favicons/applications/${application}/apple180.png`);
        document.querySelector("link[property='application_ma']").setAttribute("href",`../src/assets/favicons/applications/${application}/safari.svg`);
        document.querySelector("link[property='application_manifest']").setAttribute("href",`../src/assets/favicons/applications/${application}/site.webmanifest`);

        // remove data div
        customDataDiv.parentNode.removeChild(customDataDiv);


        // Handle History API
        if(hs == historyState.initial){
            window.history.pushState({}, rv, `/${rv}`);
            this.counter_pages = this.counter_pages + 1;
        }
        else if(hs == historyState.route){
            window.history.pushState({}, rv, `/${rv}`);
            this.counter_pages = this.counter_pages + 1;
        }
        else if(hs == historyState.pop){
            this.counter_pages = this.counter_pages - 1;
            if(this.counter_pages <= 0){
                console.error(`negative`);
                history.go (-1);
            }
            else{
                window.history.pushState(rv, ``, `/${rv}`);
            }
        }

        SwiftCS.render();
        // [UNAVAILABLE PageAnalisys API is Private]
        //new PageAnalisys().pageLoad(rv);
    }



    // [ Public Methods ] ---------------------------------------------------------------------------------------
    initializer(){
        //console.log(`Router - initializer`)
        document.addEventListener('DOMContentLoaded', function(event) {
           //new PageAnalisys();
        });
        window.addEventListener('load', function(event) {
            //console.warn("{LOAD} - page load");
            new Router().DetectPage(pageState.load);
        });
        window.addEventListener('popstate', function(event) {
            //console.error("{POP} - going back in history");
            new Router().DetectPage(pageState.pop);
        });
        if ('onpagehide' in window) {   //if: iOS 
            window.addEventListener("pagehide", function(event) {
                //console.warn("{ON BEFORE UNLOAD} -leaving page"); //Unload_PAGE(Page_NOW,2);
                //new PageAnalisys().pageUnload('leave');
            });
        } 
        else{  //if: not Windows
            window.addEventListener("onbeforeunload", function(event) {
                //console.warn("{ON BEFORE UNLOAD} -leaving page"); //Unload_PAGE(Page_NOW,3);
                //new PageAnalisys().pageUnload('leave');
            });
        }
        if (document.hidden !== undefined) {
            // The Page Visibility API is supported in this browser
            document.addEventListener('visibilitychange', function () {
                if (document.hidden) {
                    //console.warn("{PAGE HIDDEN} tab switch");
                    //new PageAnalisys().pageUnload('hidden');
                } else {
                    //console.warn("{COME BACK}");
                    //new PageAnalisys().pageInitObservation('return');
                }
            });
        }
    }
    RouteTo(routingVerso, page_History){
        // Setup
        document.getElementById("BodyId").classList.add("LoadingPage");
        var ARRAY_RouteVerso = routingVerso.split("/").filter(element => element !== '' && !supportedLanguages_regexPattern.test(element));
        var constructorView = "";
        // Helper Function
        function checkBaseView(viewToLoad){
            if(viewToLoad==null || viewToLoad=="" || viewToLoad=="notebook"){ return "NotebookView.php"; }
            else{ return `${viewToLoad}.php`; }
        }
        // Get Constructor
        if(Array.isArray(ARRAY_RouteVerso)){
            const baseView = checkBaseView(ARRAY_RouteVerso.shift());
            const parametersView = ARRAY_RouteVerso.filter(param => param !== '').map((param, index) => `p${index + 1}=${param}`).join('&');
            constructorView = `${baseView}${parametersView ? `?${parametersView}` : ''}`;
        }
        else{ constructorView = checkBaseView(ARRAY_RouteVerso); }
        // Download and load
        this.#downloadView(constructorView, page_History, routingVerso);   
    }
    DetectPage(page_State){
        var paramsInsideURL = new URLSearchParams(window.location.search);
        //GET_FROM_URL  RoutingVerso
        var RoutingVerso = paramsInsideURL.get('rv');
        if(RoutingVerso== null || RoutingVerso == ""){ 
            RoutingVerso = "notebook"; 
        }
        //Handle Page State
        if(pageState.load == page_State){
            //console.log("DetectPage - LOAD");
            if ( RoutingVerso !== null) {  this.RouteTo(RoutingVerso, historyState.initial); }
            else { this.RouteTo('', historyState.initial); }
        }
        else if(pageState.pop == page_State){
            //console.log("DetectPage - POP");
            if ( RoutingVerso !== null) {  this.RouteTo(RoutingVerso, historyState.pop); }
            else { this.RouteTo('', historyState.pop); }
        }
        else{
            console.warn('404') 
        }
    }
}

var AppRouter = new Router();
