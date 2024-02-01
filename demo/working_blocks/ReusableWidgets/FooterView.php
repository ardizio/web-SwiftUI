<?php $FolderBackToRoot = $_SERVER['DOCUMENT_ROOT'];?>

<div class="VStack" data-SwiftUI=".frame(width:720).stack(alignment:center).customPosition(pad:12,0,0).cornerRadius(window.screen.width<720?0:4)">
    <div class="HStack" data-SwiftUI=".stack(alignment:trailing).fill(Tinted_TextCOLOR_heading).customPosition(pad:12,0,0)">
        <a class="Text LinearAccent" data-SwiftUI=".fontExtension(weight:3;size:4).customPosition(pad:0,12).onTapGesture(perform:Route_notebook).opacity(0.95)">The Notebook</a>  
        <div class="Spacer"></div>
        <div class="Text" data-SwiftUI=".fontExtension(weight:2;size:7).foregroundColor(3).customPosition(pad:0,12)">v. <?php echo filemtime($FolderBackToRoot); ?>-<?php echo date("y");?></div>  
    </div>
    <div class="HStack" data-SwiftUI=".fill(Tinted_TextCOLOR_heading).customPosition(pad:12,0,16)">
        <div class="Text" data-SwiftUI=".fontExtension(weight:2;size:7).foregroundColor(3).customPosition(pad:0,12)">
            This website is a project that implement SwiftUI framework interface in the web. I've written a JavaScript module and Python scripts to Create, Detect, Render SwiftUI components in a browser. You can read more <a data-SwiftUI=".onTapGesture(perform:Route_ArticleReaderView/2023-10-13-implementing-swiftui-on-the-web-part-1)">here</a>.
        </div>  
    </div>
</div>