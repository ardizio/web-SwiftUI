<?php 
$FolderBackToRoot = $_SERVER['DOCUMENT_ROOT'];
$path = $FolderBackToRoot."app/lib/dataLayer/DataBin/".$_GET['p1'].".php";

$dataFromPHP = [
    'URL' => 'article',
    'PageName' => 'ArticleReaderView',
    'Title' => 'articleTitle',
    'Description' => 'articleDescription',
    'Application' => 'actum',
    'Languages' => 'en',
    'Robots' => 'index, follow',
    'Rating' => 'Safe For Kids',
    'Creation' => '',
    'Author' => '',
    'LectureTime' => '',
];
?>
<div class="ZStack">
    <? require_once($FolderBackToRoot . '/app/lib/presentationLayer/ReusableWidget/Background/BackgroundFollowTheLight.php'); ?>
    <div class="VStack ScrollView Reader" data-SwiftUI=".stack(alignment:trailing;spacing:2)">
        <? require_once($FolderBackToRoot . '/app/lib/presentationLayer/ReusableWidget/Article/ArticleNavbarView.php'); ?>
        <div class="VStack" data-SwiftUI=".frame(width:720)"> <? if (file_exists($path)) { include($path); } ?></div>
        <? require_once($FolderBackToRoot . '/app/lib/presentationLayer/ReusableWidget/Footer/FooterView.php'); ?>
    </div>
</div>
<?
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
