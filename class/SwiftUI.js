class SwiftUI {

    constructor() {
        if (!SwiftUI.instance) {
            //console.log('Constructing -> SwiftUI');
            //initialize data
            this.cachedReusableWidgets = {};
            //select stylesheet
            this.sheet = this.#selectStylesheet()  
            //extract SwiftUI Classes
            this.cachedListClass = this.#extractClassesStartingWithFromStylesheets('gs-');
            //page loader
            this.appLoader = this.#selectPageLoader()  
            //color list
            this.colorList = [ "Transparent", "Hex_TextCOLOR_heading",  "Hex_TextCOLOR_main", "Hex_TextCOLOR_secondary", "Hex_TextCOLOR_tertiary", "Hex_Red_Night", "Hex_White", "Hex_Black", "HexCOLOR_Teal", "TintedCOLOR_Teal", "HexCOLOR_Blue", "TintedCOLOR_Blue", "HexCOLOR_Indigo", "TintedCOLOR_Indigo", "HexCOLOR_Purple", "TintedCOLOR_Purple", "HexCOLOR_Pink", "TintedCOLOR_Pink", "HexCOLOR_Red", "TintedCOLOR_Red", "HexCOLOR_Orange", "TintedCOLOR_Orange", "HexCOLOR_Yellow", "TintedCOLOR_Yellow", "HexCOLOR_Green", "TintedCOLOR_Green","HexCOLOR_Background_0","Tinted_TextCOLOR_heading","AccentLink_Purple"];

            //return this instance
            SwiftUI.instance = this;
        }
        return SwiftUI.instance;
    }
  
    // [ Private Methods ] ----------------------------------------------------------------------------------
    #selectStylesheet(){
        // Select stylesheet or create and append
        let selectCssSheet = document.getElementById("cssModularStyle");
        if(selectCssSheet == null){
            const styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'cssModularStyle';
            document.head.appendChild(styleElement);
        }  
        return document.getElementById("cssModularStyle").sheet;
    }
    #selectPageLoader(){ 
        return document.getElementById("AppLoader");
    }
    #extractClassesStartingWithFromStylesheets(initialPrefix) {
        const classesStartingWith = [];
        const stylesheets = document.styleSheets;
        for (let i = 0; i < stylesheets.length; i++) {
            const stylesheet = stylesheets[i];
            const rules = stylesheet.cssRules || stylesheet.rules;

            if (rules) {
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                if (rule.selectorText && rule.selectorText.startsWith(`.${initialPrefix}`)) {
                // Extract the class name and add it to the array
                const className = rule.selectorText.slice(1); // Remove the leading dot from class
                classesStartingWith.push(className);
                }
            }
            }
        }
        return classesStartingWith;
    }
    #extractVariables(dataValues, varsToBeExtracted) {
        const extractedVariables = {};
        const pairs = dataValues.slice(1, -1).split(';');
        if(varsToBeExtracted == ""){
            return pairs
        }
        for (const pair of pairs) {
            const [varName, varValue] = pair.split(':');
            if (varsToBeExtracted.includes(varName.trim())) {
                const trimmedVarName = varName.trim();
                const trimmedVarValue = varValue.trim();
                //console.log({trimmedVarValue})
                extractedVariables[trimmedVarName] = trimmedVarValue;
            }
        }
        return extractedVariables;
    }
    #assignProgressiveZindex() {
        // adding dimensionality
        const zStacks = document.querySelectorAll('.ZStack');
        zStacks.forEach((zStack, zIndex) => {
            const children = Array.from(zStack.children);
            children.forEach((child, childIndex) => {
                const zIndexValue = zIndex * children.length + childIndex;
                child.style.zIndex = zIndexValue;
            });
        });
    }
    #addWidgetInCache(key, value) {
        this.cachedReusableWidgets[key] = value;
    }
    #getWidgetFromCache(key) {
        return this.cachedReusableWidgets[key];
    }
    createComponent(data, element){
        const modifiedHtmlString = data.replace(/class="/g, 'class="Hide ');
        element.insertAdjacentHTML('beforeend', modifiedHtmlString);
        // Get the newly added element by selecting the last child of 'element'
        const newlyAddedElement = element.lastElementChild;
        return newlyAddedElement;
    }
    createView(data, element){
        //console.log(`SwiftUI createView`)
        element.innerHTML = data;
        // Get the newly added element by selecting the last child of 'element'
        const newlyAddedElement = element.lastElementChild;
        return newlyAddedElement;
    }

    //Web Extractors
    #fetchSyncronouslyData(url) {
        //console.log(`SwiftUI fetchSyncronouslyData`)
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status === 200) {
            try {
                const response = xhr.responseText;
                return { response };
            } catch (error) {
                console.error('DATA Parsing error:', error);
                return false;
            }
        }
        else { 
            console.error('Error fetching DATA:', xhr.status); 
            return false;
        }
    }
    #fetchAsyncData(url) {
        //console.log(`SwiftUI fetchAsyncData`)
        async function getData(url) {
            const response = await fetch(url, {cache: "no-cache"});
            if (!response.ok) {
                return false;
            }
            const data = await response.text();
            return data;
        }
        return getData(url);
    }
    #parseJSendResponse(url, propertyName='') {
        async function getData(url) {
            const response = await fetch(url, {cache: "no-cache"});
            const data = await response.text();
            const responseData = JSON.parse(data);
            if(propertyName!=''){
                if (responseData && responseData.status === "success" && responseData.data && responseData.data[propertyName]) {
                    return responseData;
                }
                else{
                    return { status: "error", message: "Invalid Data Structure" };
                }
            }
            else{
                return { status: "error", message: "Invalid JSON format", error };
            }
        }
        return getData(url, propertyName);
    }
    #removeClassRecursive(element, className) {
        // Remove the class from the current element
        element.classList.remove(className);
        // Recursively remove the class from all children elements
        const children = element.children;
        for (let i = 0; i < children.length; i++) {
          this.#removeClassRecursive(children[i], className);
        }
    }

    // [ Public Methods ] ----------------------------------------------------------------------------------
    appLoaded(element){
        // FADE EFFECT IF LAST IS SET IN A TIMEOUT 500+ ms
        function addHide() {
            element.classList.add("Hide");
        }
        element.classList.remove("LoadingPage");
        document.getElementById("BodyId").classList.remove("LoadingPage");
        addHide();
    }
    appLoading(){
        document.getElementById("BodyId").classList.add("LoadingPage");
        this.appLoader.classList.remove("Hide");
        this.appLoader.classList.add("LoadingPage");
    }
    addCssRuleInStylesheet(newRule, newClass=""){
        this.sheet.insertRule(newRule, 0); 
        if(newClass!=""){ this.cachedListClass.push(newClass); }
    }
    isClassDefinedInStylesheets(className){ 
        return this.cachedListClass.includes(className);
    }
    encodeArrayToBase64(arrayToConvert){
        return btoa(arrayToConvert.join('|')).slice(0, -2);
    }

    // [ SwiftUI Helpers ] ----------------------------------------------------------------------------------
    #callMethod(extractedFunction, functionVariables, element){
        //console.log(`SwiftUI callMethod(${extractedFunction})`)

        var varsToBeExtracted = [];
        //console.warn(extractedFunction)
        if(extractedFunction == ".customPosition"){
            varsToBeExtracted = ['pad','off']
            const extracted = this.#extractVariables(functionVariables, varsToBeExtracted);
            this.#customPosition(extracted.pad, extracted.off, varsToBeExtracted, element);
        }
        else if(extractedFunction == ".fontExtension"){
            varsToBeExtracted = ['weight','size','style','color']
            const extracted = this.#extractVariables(functionVariables, varsToBeExtracted);
            this.#customText(extracted.weight, extracted.size, extracted.style, extracted.color, varsToBeExtracted, element);
        }
        else if(extractedFunction == ".foregroundColor"){
            const extracted = this.#extractVariables(functionVariables, '');
            this.#foregroundColor(extracted, element);
        }
        else if(extractedFunction == ".fill"){
            const extracted = this.#extractVariables(functionVariables, '');
            this.#fill(extracted, element);
        }
        else if(extractedFunction == ".frame"){
            varsToBeExtracted = ['width','height']
            const extracted = this.#extractVariables(functionVariables, varsToBeExtracted);
            this.#frame(extracted.width, extracted.height, varsToBeExtracted, element);
        }
        else if(extractedFunction == ".animation"){
            const extracted = this.#extractVariables(functionVariables, '');
            window[extracted](element);
        }
        else if(extractedFunction == ".opacity"){
            const extracted = this.#extractVariables(functionVariables, '');
            this.#opacity(extracted, element);
        }
        else if(extractedFunction == ".lineSpacing"){
            const extracted = this.#extractVariables(functionVariables, '');
            this.#lineSpacing(extracted, element);
        }
        else if(extractedFunction == ".lineLimit"){
            const extracted = this.#extractVariables(functionVariables, '');
            this.#lineLimit(extracted, element);
        }
        else if(extractedFunction == ".ForEach"){
            varsToBeExtracted = ['container','structure','match'];
            const extracted = this.#extractVariables(functionVariables, varsToBeExtracted);
            this.#ForEach(extracted, element); // ASYNC
        }
        else if(extractedFunction == ".stack"){
            varsToBeExtracted = ['alignment','spacing']
            const extracted = this.#extractVariables(functionVariables, varsToBeExtracted);
            this.#stack(extracted.alignment, extracted.spacing, varsToBeExtracted, element);
        }
        else if(extractedFunction == ".cornerRadius"){
            const extracted = this.#extractVariables(functionVariables, '');
            this.#cornerRadius(extracted, element);
        }
        else if(extractedFunction == ".border"){
            varsToBeExtracted = ['color','size','style']
            const extracted = this.#extractVariables(functionVariables, varsToBeExtracted);
            this.#border(extracted.color, extracted.size, extracted.style, varsToBeExtracted, element);
        }
        else if(extractedFunction == ".obs"){
            const extracted = this.#extractVariables(functionVariables, '');
            this.#obs(extracted, element);
        }
        else if(extractedFunction == ".onTapGesture"){
            varsToBeExtracted = ['count','perform']
            const extracted = this.#extractVariables(functionVariables, varsToBeExtracted);
            this.#onTapGesture(extracted.count, extracted.perform, varsToBeExtracted, element);
        }
        else if(extractedFunction == ".BlockLaTeX"){
            this.#BlockLaTeX(element);
            element.classList.remove("SwiftLaTeX")
            element.classList.add("LaTeX")
        }
        else if(extractedFunction == ".BlockCode"){
            this.#BlockCode(element);
        }
        else if(extractedFunction == ".Image"){
            varsToBeExtracted = ['light','dark','alt']
            const extracted = this.#extractVariables(functionVariables, varsToBeExtracted);
            this.#Image(extracted.light, extracted.dark, extracted.alt, element);
        }
    }
    #updateColorSelection(color) {
        color = `${color}`

        let selectedColor = "";
        let indexColor = 0;

        if (this.colorList.includes(color)) {
            indexColor = this.colorList.indexOf(color);
            selectedColor = `var(--${color})`;
        } 
        else {
            color = Number(color);
            if (isNaN(color)) { selectedColor = "var(--Hex_TextCOLOR_main)"; } 
            else {
                if (color <= this.colorList.length) {
                    selectedColor = `var(--${this.colorList[color]})`;
                    indexColor = color;
                } 
                else { selectedColor = "var(--Hex_TextCOLOR_main)"; }
            }
        }

        return { selectedColor, indexColor };
    }
    #extractDataParts(inputString) {
        // todo: improve code readability
        inputString = `${inputString}`;
        //console.log({inputString});
        var returnVar = [];

        function Detection(string, fct){
            //console.warn(string);
            //Dectetion Parts
            const second_QuestionMark = string.indexOf('?');
            const first_Colon = string.indexOf(':');
            //console.log(`?${second_QuestionMark} - :${first_Colon}`)
            // Handling Detection
            if (second_QuestionMark === -1 && first_Colon === -1) { return [false, false, false, false]; } 
            else if (second_QuestionMark === -1 || second_QuestionMark > first_Colon) { return AnalyzeColumnFirst(string, fct, second_QuestionMark); } 
            else if (first_Colon === -1 || second_QuestionMark < first_Colon ) { return AnalyzeQuestionFirst(string, fct, second_QuestionMark); }
        }
        function AnalyzeQuestionFirst(str, fct, sqm){
            //console.log("? - AnalyzeQuestionFirst");   
            //const FCT = str.substring(0, indexOfQuestionMark);
            //str = inputString.substring(indexOfQuestionMark + 1);
            const lastIndex = str.lastIndexOf(':');
            if (lastIndex !== -1){
                //console.log(str)
                var beforeColon = str.substring(0, lastIndex);
                var afterColon = str.substring(lastIndex + 1);
                //console.log(`"FCT" - ${afterColon} -> ${beforeColon}`);
                if(sqm == -1){ 
                    var re = [fct, beforeColon, afterColon, ""];
                    //console.log({re})
                    return re; 
                }
                else{ 
                    var ra = [fct, "fct", afterColon, beforeColon];
                    //console.log({ra})
                    return ra; 
                }
            } 
            else {
                return [false, false, false, false];
            }
        }
        function AnalyzeColumnFirst(str, fct, sqm){
            //console.log(": - AnalyzeColumnFirst");
            const firstIndex = str.indexOf(':');
            if (firstIndex !== -1){
                //console.log(str)
                var beforeColon = str.substring(0, firstIndex);
                var afterColon = str.substring(firstIndex + 1);
                //console.log(`${beforeColon} - "FCT" -> ${afterColon}`);
                if(sqm == -1){ 
                    var re = [fct, beforeColon, afterColon, ""];
                    //console.log({re})
                    return re; 
                }
                else{ 
                    var ra = [fct, beforeColon, "fct", afterColon];
                    //console.log({ra})
                    return ra; 
                }
            } 
            else {
                return [false, false, false, false];
            }
        }
        
        // --- MAIN ---
        const questionMarkCount = (inputString.match(/\?/g) || []).length;
        if(questionMarkCount>0){
            for (let i = 0; i < questionMarkCount; i++) {
                const indexOfQuestionMark = inputString.indexOf('?');
                if (indexOfQuestionMark !== -1) {
                    const fct = inputString.substring(0, indexOfQuestionMark);
                    inputString = inputString.substring(indexOfQuestionMark + 1);
                    const [fn, t, f, s] = Detection(inputString, fct);
                    const line = {fn:fn, f:f, t:t};
                    returnVar.push(line);
                    inputString = s;
                }
            }
            return returnVar;
        }
        else{
            return inputString;
        }
        
    }
    #implementCSS(input, type, lineCSS, classCSS, ruleCSS, element){
        if (Array.isArray(input)) {
            //console.log('In array')
            var mantainer = '';
            if (input[0] && input[0].fn) {
                input.forEach((e, index) => {
                    // Access individual elements within the object
                    const fn = e.fn;
                    const f = e.f;
                    const t = e.t;
                    //console.log(`${fn} - ${eval(fn)}  -  f:${f}  -  t:${t}`);
                    if(eval(fn)){
                        if(t!="fct"){
                            mantainer = t;
                            //console.log({t})
                        }
                    } 
                    else{
                        if(f!="fct"){
                            mantainer = f
                            //console.log({f})
                        }
                    }
                });
                //console.log(mantainer)
                input = String(mantainer);
                implement();
            } 
            else {
                //console.log('fast pass array')
                //console.log(input)
                implement();
            }  
        } 
        else {
            //console.log('fast pass')
            implement();
        }

        function implement(){
            const swui = new SwiftUI()
            //console.log('Implementing CSS');
            //Convert to Type
            if(type=='Number'){
                input = Number(input);
            }
            else if(type == 'String'){
                input = String(input);
            }

            //Replace Placeholder line
            if (lineCSS.includes('PLACEHOLDER')) {
                lineCSS = lineCSS.replace(/PLACEHOLDER/g, input);
            }
            //console.log(lineCSS)
            //Encode Class
            const encodedInput = swui.encodeArrayToBase64([input]);

            //Create Class Name
            if (classCSS.includes('PLACEHOLDER')) {
                classCSS = classCSS.replace(/PLACEHOLDER/g, encodedInput);
            }

            //Add Class to Cache and Stylesheet 
            if (!swui.isClassDefinedInStylesheets(classCSS)) {
                if(ruleCSS==""){
                    const newRule = `
                    .${classCSS} {
                        ${lineCSS}
                    }`;
                    swui.addCssRuleInStylesheet(newRule, classCSS);
                }
                else{
                    ruleCSS = ruleCSS.replace(/CLASS_PLACEHOLDER/g, classCSS);
                    ruleCSS = ruleCSS.replace(/LINE_PLACEHOLDER/g, lineCSS);
                    swui.addCssRuleInStylesheet(ruleCSS, classCSS);
                }
            }

            //Add Class to element
            element.classList.add(classCSS);
        }
        
    }

    // SwiftUI Methods
    #Image(light='', dark='', alt='', element){

        var prevention = false;

        if(light!='' && dark!=''){ prevention = false; }
        else if(light!='' && dark==''){  dark==light; }
        else if(light=='' && dark!=''){  light==dark; }
        else if(light=='' && dark==''){ prevention = true }

        if (prevention == false){
            const pictureString = `
            <picture>
                <source srcset="https://${dark}" media="(prefers-color-scheme: dark)">
                <img alt="${alt}" src="https://${light}">
            </picture>
            `;

            element.innerHTML = pictureString;
        }
    }
    #customPosition(padding = '0,0,0,0', offset= '0,0', variables, element){

        let topPadding = 0, 
            rightPadding = 0, 
            bottomPadding = 0,
            leftPadding = 0, 
            xOffset =0,
            yOffset = 0;

        /* PADDING */
        if (padding.includes(",")) {
            padding = padding.split(',');
            var padding_lenght = padding.length;
            if(padding_lenght==2){
                topPadding = padding[0];
                bottomPadding = padding[0];
                rightPadding = padding[1];
                leftPadding = padding[1];
            }
            else if(padding_lenght==3){
                topPadding = padding[0];
                rightPadding = padding[1];
                leftPadding = padding[1];
                bottomPadding = padding[2];
            }
            else if(padding_lenght==4){
                topPadding = padding[0];
                rightPadding = padding[1];
                bottomPadding = padding[2];
                leftPadding = padding[3];
            }
        }
        else if (!isNaN(Number(padding))) { 
            topPadding = padding;
            rightPadding = padding;
            bottomPadding = padding;
            leftPadding = padding; 
        } 
        else { 
            topPadding = "0";
            rightPadding = "0";
            bottomPadding = "0";
            leftPadding = "0";
        } 

        /* OFFSET */
        if (offset.includes(",")) {
            offset = offset.split(',');
            xOffset = offset[0];
            yOffset = offset[1];
            if (isNaN(xOffset) || isNaN(yOffset)) { 
                xOffset= 0;
                yOffset = 0; 
            }
        }

        const padding_str = this.encodeArrayToBase64([topPadding, rightPadding, bottomPadding, leftPadding]);
        const offset_str = this.encodeArrayToBase64([xOffset, yOffset]);

        const className = `gs-customPosition-${variables[0]}_${padding_str}-${variables[1]}_${offset_str}`;

        if (!this.isClassDefinedInStylesheets(className)) {
            const newRule = `
            .${className} {
                padding: ${topPadding}px ${rightPadding}px ${bottomPadding}px ${leftPadding}px;
                transform: translate(${xOffset}px, ${yOffset}px);
            }`;
            this.addCssRuleInStylesheet(newRule, className);
        }

        element.classList.add(className);
    }
    #customText(weight='3',size='5',style=[],color='Hex_TextCOLOR_main', variables, element){
    
        weight = `${weight}`;
        var FontWeight = 'var(--FontWEIGHT_regular)';
        if(weight=="1"){ FontWeight = 'var(--FontWEIGHT_light)'; }
        else if(weight=="2"){ FontWeight = 'var(--FontWEIGHT_regular)'; }
        else if(weight=="3"){ FontWeight = 'var(--FontWEIGHT_semibold)'; }
        else if(weight=="4"){ FontWeight = 'var(--FontWEIGHT_bold)'; }

        size = `${size}`;
        var FontSize = 18;
        if(size=="-1"){ FontSize = 96; }
        else if(size=="-2"){ FontSize = 80;}
        else if(size=="1"){ FontSize = 48;}
        else if(size=="2"){ FontSize = 36;}
        else if(size=="3"){ FontSize = 24;}
        else if(size=="4"){ FontSize = 20;}
        else if(size=="5"){ FontSize = 16;}
        else if(size=="6"){ FontSize = 14;}
        else if(size=="7"){ FontSize = 12;}
        else if(size=="8"){ FontSize = 10;}
        else if(size=="9"){ FontSize = 8;}

        var FontStyle_Bold = "",
            FontStyle_Italic = "",
            FontStyle_Underline = "",
            FontStyle_Striketrough = "";                
        if(style.includes("bold")){ FontStyle_Bold = "font-weight: bold;"; }
        if(style.includes("italic")){ FontStyle_Italic = "font-style: italic;";  }
        if(style.includes("underline")){  FontStyle_Underline = "text-decoration: underline;"; }
        if(style.includes("striketrough")){ FontStyle_Striketrough = "text-decoration: line-through;"; }

        const { selectedColor, indexColor } = this.#updateColorSelection(color);

        const fontWeight_str = this.encodeArrayToBase64([weight]);
        const fontSize_str = this.encodeArrayToBase64([size]);
        const fontStyle_str = this.encodeArrayToBase64([FontStyle_Bold, FontStyle_Italic, FontStyle_Underline, FontStyle_Striketrough]);
        const fontColor_str = this.encodeArrayToBase64([indexColor]);

        const className = `gs-customText-${variables[0]}_${fontWeight_str}-${variables[1]}_${fontSize_str}-${variables[2]}_${fontStyle_str}-${variables[3]}_${fontColor_str}`;

        if (!this.isClassDefinedInStylesheets(className)) {
            const newRule = `
            .${className} {
                font-family: ${FontWeight};
                font-size: ${FontSize}px;
                ${FontStyle_Bold}
                ${FontStyle_Italic}
                ${FontStyle_Underline}
                ${FontStyle_Striketrough}
                color: ${selectedColor};
            }`;
            this.addCssRuleInStylesheet(newRule, className);
        }
        element.classList.add(className);
    }
    #foregroundColor(color='Hex_TextCOLOR_main', element){

        const { selectedColor, indexColor } = this.#updateColorSelection(color);

        const className = `gs-foregroundColor-fc_${indexColor}`;

        if (!this.isClassDefinedInStylesheets(className)) {
            const newRule = `
            .${className} {
                color: ${selectedColor} !important;
            }`;
            this.addCssRuleInStylesheet(newRule, className);
        }

        element.classList.add(className);
    }
    #fill(color='Transparent', element){

        const Materials = [
            "UltraThinMaterial", "ThinMaterial", "ThickMaterial", "UltraThickMaterial"
        ]
        const index = Materials.indexOf(`${color}`);

        if (index !== -1){
            element.classList.add(`${Materials[index]}`);
        }
        else{
            const { selectedColor, indexColor } = this.#updateColorSelection(color);

            const className = `gs-fill-bg_${indexColor}`;

            if (!this.isClassDefinedInStylesheets(className)) {
                const newRule = `
                .${className} {
                    background-color: ${selectedColor};
                }`;
                this.addCssRuleInStylesheet(newRule, className);
            }

            element.classList.add(className);
        }

        
    }
    #frame(width='', height='', variables, element){

        var Frame_Width, FrameHeight = "";    
        
        if(width!=''){
            width = Number(width);
            if (!isNaN(width)){ Frame_Width = `max-width: ${width}px; width:100%;`; } 
        }
        if(height!=''){
            height = Number(height);
            if (!isNaN(height)){ FrameHeight = `height: ${height}px;`; }  
        }

        if(Frame_Width!="" || FrameHeight!=""){
            const width_str = this.encodeArrayToBase64([width]);
            const height_str = this.encodeArrayToBase64([height]);

            const className = `gs-frame-${variables[0]}_${width_str}-${variables[1]}_${height_str}`;

            if(Frame_Width==undefined){Frame_Width=""}
            if(FrameHeight==undefined){FrameHeight=""}

            if (!this.isClassDefinedInStylesheets(className)) {
                const newRule = `
                .${className} {
                    ${Frame_Width}
                    ${FrameHeight}
                }`;
                this.addCssRuleInStylesheet(newRule, className);
            }

            element.classList.add(className);
        }
        
    }
    #opacity(level, element){
        var rule = "";
        level = this.#extractDataParts(level);
        this.#implementCSS(level, 'Number', "opacity: PLACEHOLDER;", "gs-opacity-op_PLACEHOLDER", rule ,element)
    }
    #stack(alignment='',spacing='', variables, element){

        var Stack_Alignment, Stack_Spacing = "";   

        //alignment
        alignment = `${alignment}`
        if (element.classList.contains('VStack')) {
            if(alignment=="leading"){
                element.classList.add("aligmentLeading");
                Stack_Alignment = "aligmentLeading";
            }
            else if(alignment=="center"){
                element.classList.add("alignmentCenter");
                Stack_Alignment = "alignmentCenter";
            }
            else if(alignment=="trailing"){
                element.classList.add("alignmentTrailing");
                Stack_Alignment = "alignmentTrailing";
            }
        }
        else if (element.classList.contains('HStack')) {
            if(alignment=="top"){
                element.classList.add("aligmentTop");
                Stack_Alignment = "aligmentTop";
            }
            else if(alignment=="bottom"){
                element.classList.add("alignmentBottom");
                Stack_Alignment = "alignmentBottom";
            }
            else if(alignment=="trailing"){
                element.classList.add("alignmentTextBaseline");
                Stack_Alignment = "alignmentTextBaseline";
            }
        }
        else{
            Stack_Alignment = 'default'
        }

        //spacing
        spacing = Number(spacing);
        if (!isNaN(spacing)){ 
            Stack_Spacing = `gap: ${spacing}px;`; 
        } 

        if(Stack_Spacing!=""){
            const alignment_str = this.encodeArrayToBase64([Stack_Alignment]);
            const spacing_str = this.encodeArrayToBase64([spacing]);
            const className = `gs-stack-${variables[0]}_${alignment_str}-${variables[1]}_${spacing_str}`;

            if (!this.isClassDefinedInStylesheets(className)) {
                const newRule = `
                .${className} {
                    ${Stack_Spacing}
                }`;
                this.addCssRuleInStylesheet(newRule, className);
            }

            element.classList.add(className);
        }


    }
    #cornerRadius(radius, element){
        var rule = "";
        radius = this.#extractDataParts(radius);
        this.#implementCSS(radius,'Number', "border-radius: PLACEHOLDERpx;", "gs-cornerRadius-rd_PLACEHOLDER", rule ,element)
    }
    #border(color='Hex_TextCOLOR_main', size='1', style='solid', variables, element){

        const { selectedColor, indexColor } = this.#updateColorSelection(color);
        size = Number(size);
        style = `${style}`;

        
        const color_Str = this.encodeArrayToBase64([indexColor]);
        const size_Str = this.encodeArrayToBase64([size]);
        const style_Str = this.encodeArrayToBase64([style]);

        const className = `gs-border-${variables[0]}_${color_Str}-${variables[1]}_${size_Str}-${variables[2]}_${style_Str}`;

        if (!this.isClassDefinedInStylesheets(className)) {
            const newRule = `
            .${className} {
                border-style: ${style};
                border-width: ${size}px;
                border-color: ${selectedColor};
                width: calc(100% - ( 2 * ${size})px);
            }`;
            this.addCssRuleInStylesheet(newRule, className);
        }

        element.classList.add(className);
    }
    #lineSpacing(spacing, element){
        var rule = "";
        spacing = this.#extractDataParts(spacing);
        this.#implementCSS(spacing, 'String', "line-height: PLACEHOLDER;", "gs-lineSpacing-ls_PLACEHOLDER", rule ,element)
    }
    #lineLimit(clamp, element){
        var rule = `
        .CLASS_PLACEHOLDER {
            display: -webkit-box;
            LINE_PLACEHOLDER
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }`;;
        clamp = this.#extractDataParts(clamp);
        this.#implementCSS(clamp, 'Number', "-webkit-line-clamp: PLACEHOLDER;", "gs-lineLimit-ll_PLACEHOLDER", rule ,element)
    }  
    #obs(name, element){
        console.log(`SwiftUI obs`)
        element.classList.add(`OBS-${name}`)
    }
    #onTapGesture(count='1', perform='', variables, element){
        element.classList.add("Tappable")

        // Adding herf link
        var extractFunction = perform.split("_");
        if (extractFunction[0] == "Route") {
            var dataUuidValue = element.getAttribute('data-uuid');
            if (dataUuidValue != null){
                if (extractFunction[1].includes('/@')) {
                    // Find the index of '@'
                    var atIndex = extractFunction[1].indexOf('@');
                    // Extract the substring before '@' (excluding '@')
                    var uuid_routing = extractFunction[1].substring(0, atIndex);
                    // Append dataUuidValue at the end
                    uuid_routing += dataUuidValue;
                    element.classList.add("TappableUUID")
                    element.href = `YOUR_WEB_DOMAIN/${uuid_routing}`;
                }
                else{
                    element.href = `YOUR_WEB_DOMAIN/${extractFunction[1]}`;
                }
            }
            else{
                element.href = `YOUR_WEB_DOMAIN/${extractFunction[1]}`;
            }
        }
        else if (extractFunction[0] == "RouteExternal") {
            element.href = `https://www.${extractFunction[1]}`;
            element.target = '_blank';
        }
        //Link Handler
        element.addEventListener('click', function(event) {
            event.preventDefault();
            // Route Option
            if (extractFunction[0] == "Route") {
                // Check if the first element of extractFunction is "Route"
                const match1 = extractFunction[1].match(/@([^/]+)/);
                // Use a regular expression to find a pattern that starts with "@" followed by some characters that are not "/"
                // and capture that pattern inside parentheses.
                //console.warn(match1);
                // Log the result of the match1 operation to the console (for debugging).
                if (match1 != null) {
                    // Check if match1 is not null, which means the pattern was found.
                    const attribute = element.getAttribute(`data-${match1[1]}`);
                    // Get the attribute of an HTML element (specified by the "element" variable)
                    // with a name constructed by prepending "data-" to the value captured by match1.
                    extractFunction[1] = extractFunction[1].replace(`@${match1[1]}`, `${attribute}`);
                    // Replace the pattern (e.g., "@someAttribute") with the value of the corresponding attribute.
                }
                // Call a function named "RouteTo" with the modified value of extractFunction[1] and a string "route" as arguments.
                AppRouter.RouteTo(extractFunction[1], "route");
            }
             // Route External
            else if (extractFunction[0] == "RouteExternal") {
                window.open(`https://${extractFunction[1]}`, '_blank');
            }
            // External function Option
            else{
                window[extractFunction[0]](extractFunction[1])
            }
        });
    }
    #BlockLaTeX(element){
        //console.log(`SwiftUI BlockLaTeX`)

        function renderLaTeX(element) {
            // Wait for KaTeX to be ready
            katex.render(element.textContent, element);
        }

        if (typeof katex === 'undefined') {
            // Optionally, you can load KaTeX CSS as well
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.css';
            document.head.appendChild(link);

            
            // If not loaded, dynamically load KaTeX from CDN
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.js';
            script.onload = function() {
                renderLaTeX(element);
            };
            document.head.appendChild(script);
        } 
        else { renderLaTeX(element); }
    }
    #BlockCode(element){
        //console.log(`SwiftUI BlockCode`)

        // Function to check if Highlight.js is loaded
        function isHighlightJsLoaded() {
            return typeof hljs !== 'undefined';
        }

        // Function to load Highlight.js and highlight code elements
        function loadHighlightJsAndHighlightCode() {
            if (!isHighlightJsLoaded()) {
                // Highlight.js is not loaded, so add the stylesheet and script dynamically
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'YOUR_WEB_DOMAIN/app/lib/applicationLayer/Utilities/Highlight.paraiso-dark.css';

                var script = document.createElement('script');
                script.src = 'YOUR_WEB_DOMAIN/app/lib/applicationLayer/Utilities/Highlight.js';
                script.onload = function() {
                    // Highlight.js is loaded, so apply syntax highlighting
                    hljs.configure({
                        ignoreUnescapedHTML: true,
                        throwUnescapedHTML: false
                    });
                      
                    hljs.highlightAll();
                };

                document.head.appendChild(link);
                document.head.appendChild(script);
            } else {
                // Highlight.js is already loaded, so apply syntax highlighting
                hljs.highlightAll();
            }
        }

        // Call the function to load Highlight.js and highlight code elements
        loadHighlightJsAndHighlightCode();

    }
    #ForEach(extraction, element){

        return new Promise(()=> {
            //console.log(`SwiftUI ForEach`)

            // Your asynchronous logic here
        
            // variables initialization
            var constructorReusableView = "",
                constructorCoreData = "",
                matchArray = "",
                reusableWidget = "",
                returnedDataStructure = "";


            // data extraction from input 
            if (extraction.container !== undefined) { constructorReusableView = `${extraction.container}`; } 
            if (extraction.structure !== undefined) { constructorCoreData = `${extraction.structure}`; } 
            if (extraction.match !== undefined) { matchArray = `${extraction.match}`.split('_'); } 


            var partOne = false;
            var partTwo = false;

            function checkWidgetCreation(){
                if(partOne == true && partTwo == true){
                    CreateWidget();
                }
                else{
                    //console.log("parts error")
                }
            }

            //3. create widget
            function CreateWidget(){
                //console.log({reusableWidget})
                //console.log({returnedDataStructure})
                //console.log({element})

                for (let j = 0; j < returnedDataStructure.data[constructorCoreData].length; j++) {

                    const SwiftCS = new SwiftUI();
                    const lastElement = SwiftCS.createComponent(reusableWidget, element);

                    if(returnedDataStructure.data[constructorCoreData][j]['id'] != undefined){
                        lastElement.setAttribute('data-uuid', returnedDataStructure.data[constructorCoreData][j]['id']);
                    }
                    //4. inject Data into Widget
                    for (let i = 0; i < matchArray.length; i++) {
                        //Split match json-phpobj
                        const connections = matchArray[i].split('-');
                        //Parse for data-value
                        lastElement.querySelectorAll('[data-value]').forEach(item => {
                            //get data-value attribute
                            const attribute = item.getAttribute('data-value');
                            if(attribute == connections[1]){
                                item.textContent = `${returnedDataStructure.data[constructorCoreData][j][connections[0]]}`;
                            }
                        });
                    }
                    SwiftCS.selectiveRender(element);
                }
                //new PageAnalisys().loadOBS();
            }
            // 1. getComponent
            if(constructorReusableView!=""){
                //extract widget from cache
                reusableWidget = this.#getWidgetFromCache(constructorReusableView);
                if(reusableWidget == null){
                    // get widget from url
                    var response_Widget = this.#fetchAsyncData(`YOUR_WEB_DOMAIN/app/lib/presentationLayer/ReusableWidget/${constructorReusableView}.php`);
                    response_Widget
                        .then((result) => {
                            if(result != false){
                                partOne = true;
                                //console.log({partOne})
                                this.#addWidgetInCache(constructorReusableView, result);
                                reusableWidget = result;
                                checkWidgetCreation();
                            }
                            else{ return; }
                        })
                        .catch((error) => {
                            console.log(error);
                            return;
                        })
                }
                else{
                    partOne = true;
                    checkWidgetCreation();
                }
            }

            //2. getData
            if(constructorCoreData!=""){

                // todo: add rest api URL, the next is a MOCK ONE
                const URL_JSON = `YOUR_WEB_DOMAIN/app/lib/dataLayer/DataBin/notebook_DATA.json`;

                var parsed_JSON = this.#parseJSendResponse(URL_JSON, constructorCoreData);
                    parsed_JSON
                        .then((result) => {
                            if(result != false){
                                partTwo = true;
                                //console.log({partTwo}, {constructorReusableView})
                                returnedDataStructure = result;
                                //console.log(returnedDataStructure)
                                checkWidgetCreation();
                                //console.log(result.data[constructorCoreData][0]['id'])
                                //console.log(Object.keys(result.data[constructorCoreData][0]));
                                //console.log(result.data[constructorCoreData].length)
                            }
                            else{ return; }
                        })
                        .catch((error) => {
                            console.log(error);
                            return;
                        })  
            }
        });
    }  

    

    // Renderer
    render(){
        this.#assignProgressiveZindex()
        document.querySelectorAll('[data-SwiftUI]').forEach(element => {
            const dataValues = element.getAttribute('data-SwiftUI');
            const functionNames = dataValues.match(/\.\w+(?=\()/g);
            const functionVars = dataValues.match(/\(([^)]+)\)/g);
            // Initializer
            for (let i = 0; i < functionNames.length; i++) {
                this.#callMethod(functionNames[i], functionVars[i], element);
            }
            // Remove data-SwiftUI
            element.removeAttribute('data-SwiftUI');
            //console.warn(functionNames)
        });
        // Page unload
        //console.warn('rendered SYNC')

        setTimeout(() => {
            this.appLoaded(this.appLoader);
        }, 0);
        // Execute this.#ForEach(extracted, element) asynchronously
        //new PageAnalisys().loadOBS();
    }

    selectiveRender(selected){
        selected.querySelectorAll('[data-SwiftUI]').forEach(element => {
            const dataValues = element.getAttribute('data-SwiftUI');
            const functionNames = dataValues.match(/\.\w+(?=\()/g);
            const functionVars = dataValues.match(/\(([^)]+)\)/g);
            // Initializer
            for (let i = 0; i < functionNames.length; i++) {
                this.#callMethod(functionNames[i], functionVars[i], element);
            }
            // Remove data-SwiftUI
            element.removeAttribute('data-SwiftUI');
        });
        //console.log('rendered ASYNC')
        this.#removeClassRecursive(selected ,'Hide')
    }
}