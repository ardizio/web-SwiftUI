<?php 
$FolderBackToRoot = $_SERVER['DOCUMENT_ROOT'];
$dataFromPHP = [
    'URL' => 'NotebookView',
    'PageName' => 'NotebookView',
    'Title' => 'The Notebook',
    'Description' => 'Notes on machine learning, tech and life.',
    'Application' => 'actum',
    'Languages' => 'en',
    'Robots' => 'index, follow',
    'Rating' => 'Safe For Kids',
];
echo '<div class="" id="customDataDiv" 
                    data-url="' . $dataFromPHP['URL'] . '" 
                    data-pagename="' . $dataFromPHP['PageName'] . '" 
                    data-title="' . $dataFromPHP['Title'] . '" 
                    data-description="' . $dataFromPHP['Description'] . '" 
                    data-application="' . $dataFromPHP['Application'] . '" 
                    data-languages="' . $dataFromPHP['Languages'] . '" 
                    data-robots="' . $dataFromPHP['Robots'] . '" 
                    data-rating="' . $dataFromPHP['Rating'] . '"></div>';
?>
<div class="ZStack">
    <? require_once($FolderBackToRoot . '/app/lib/presentationLayer/ReusableWidget/Background/BackgroundFollowTheLight.php'); ?>
    <div class="VStack ScrollView Reader" data-SwiftUI=".stack(alignment:trailing;spacing:2)">
        <div class="VStack" data-SwiftUI=".frame(width:720)">
            <div class="Text LinearAccent" data-SwiftUI=".customPosition(pad:20,12,8;off:0).fontExtension(weight:3;size:2).foregroundColor(2).lineSpacing(1.25)">👋 Welcome to <br class="displayOnSmall">The Notebook.</div>
            <div class="Text" data-SwiftUI=".customPosition(pad:0,12,12).fontExtension(weight:2;size:5).foregroundColor(3)">Hi, I'm Manuel Ardizio. I'm documenting my learning journey on this blog. I have a background in Automation Engineering from the University of Bologna and the University of Toronto. <br class="displayOnSmall">Now, I'm focused on Enhancing Value Extraction from Data and developing ML and DL Models.</div>  
            <div class="VStack"  data-SwiftUI=".customPosition(pad:0,12,36)">
                <div class="HStack" data-SwiftUI=".stack(alignment:leading;spacing:24)">
                    <a class="Image" data-SwiftUI=".Image(light:www.actum.it/app/app/assets/github.light.svg;dark:www.actum.it/app/app/assets/github.dark.svg).frame(width:32;height:32).onTapGesture(perform:RouteExternal_github.com/ardizio).opacity(0.7)"></a>
                    <a class="Image" data-SwiftUI=".Image(light:www.actum.it/app/app/assets/linkedin.light.svg;dark:www.actum.it/app/app/assets/linkedin.dark.svg).frame(width:32;height:32).onTapGesture(perform:RouteExternal_www.linkedin.com/in/ardiziomanuel/).opacity(0.7)"></a>
                    <a class="Image" data-SwiftUI=".Image(light:www.actum.it/app/app/assets/twitterx.light.png;dark:www.actum.it/app/app/assets/twitterx.dark.png).frame(width:32;height:32).onTapGesture(perform:RouteExternal_www.x.com/ArdizioManuel).opacity(0.7)"></a>
                    <div class="Spacer"></div>
                </div>
            </div>
            <div class="VStack" data-SwiftUI=".stack(alignment:leading;spacing:12).customPosition(pad:0,0,24).ForEach(container:Blog/BlogPostContainerView;structure:ArticleList;match:title-articleTitle_body-articleDescription_creation-articleDate_author-articleAuthor_lectureTime-articleReadingTime)"></div>
            <? require_once($FolderBackToRoot . '/app/lib/presentationLayer/ReusableWidget/Footer/FooterView.php'); ?>
        </div>
    </div>
</div>