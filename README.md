# A Javascript framework enabling SwiftUI Apps the web.

![SwiftUI for web](https://www.actum.it/app/lib/dataLayer/DataBin/swiftui-drawn-logo.webp)

The goal for this project has been to enable SwiftUI portability to the Web.

I used vanilla Javascript. It solves Performace, Accessibility, Best Practices and SEO.

I'm not porting SwiftUI to web like [Tokamak](https://github.com/TokamakUI/Tokamak), insted I'm using JS to handle everything natively on all browsers.

***The Issue***: I did't wanted to rewrite for each platform starting from `.swift`

***The Solution***: Converting `.swift` code to usable `.php` or `.js`.

[Swift -> Transformation -> .php/.js Usable View on the web]

### a. Undestand the Logic

Before digging in the code just read the article in my blog: [Implementing SwiftUI on the Web Part 1](https://www.actum.it/ArticleReaderView/2023-10-13-implementing-swiftui-on-the-web-part-1). There is a general overview of the project and how to use the code. The main webite at that url is using SwiftUI as backbone. So it's working and you will notice that's really fast.

After reading you will understand my choices. I have implemented 2 Classes `Router` that handles Application Routing, and `SwiftUI` that handles Styling and Views loading from cache or a determined app web loaction.

### b. Loading  Classes

To use the Framework you need to add to your web app.

``` html
<script src="folder/app/lib/applicationLayer/Coree/SwiftUI.js>"></script>
<script src="folder/app/lib/applicationLayer/Core/Router.js>"></script>
```

### c. Conversion Markdown to SwiftUI

In order to transform Markdown notes to views in my blog I've written a Python script to convert `.md` to web-SwiftUI `.php` compatible. It will be easy to extend to `.js` for SSR.

``` terminal
python utilities/markdown_to_webswiftui.py "{PATH_TO_MD_FOLDER}\{FILE_NAME}.md" "{OUTPUT_FOLDER}"
```

# Notes

I used iOS 16.0 conventions. Need some updates an class fallbacks if porting to iOS 17.

The available Instances are: `ForEach`, `onTapGesture`, `lineLimit`, `lineSpacing`, `border`, `cornerRadius`, `stack`, `opacity`, `frame(width, height)`, `fill`, `foregroundColor`, ` customText(weight, size, style, color)`, `customPosition(padding, offset)`, `Image`

What's missing: **CoreData Implementation** and  **Advanced Animation Control**. This implementation is not designed to access Apple Swift Kits and APIs. 

# Future Works

- I aim to efficiently compile multiple data classes in a single file, with compilation occurring only on the first occurrence. On subsequent instances, the code should simply append the appropriate class name. This improvement could improve JS render times in big components by a significant 70%.

- Add CoreData via localStorage

- Add More conversion scripts (swiftui to web swiftui) and vice versa. 

This is my folder structure, `SwiftUI` and `Router` are at `folder/app/lib/applicationLayer/Core`.
```
folder/
├─ app/
│  ├─ assets/
│  ├─ extra/
├─ cloudFunctions/
├─ lib/
│  ├─ applicationLayer/
│  │  ├─ Core/
│  │  ├─ Extensions/
│  │  ├─ Utilities/
│  ├─ dataLayer/
│  │  ├─ DataEnum/
│  │  ├─ DataBin/
│  │  ├─ Managers/
│  ├─ presentationLayer/
│  │  ├─ ReusableWidget/
│  │  ├─ Views/
```

# License
JS_SwiftUI is available under the Apache 2.0 license. Unless required by applicable law or agreed to in writing, software distributed under the [License](https://github.com/ardizio/web-SwiftUI/blob/main/LICENSE) is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the LICENSE file for more info.
