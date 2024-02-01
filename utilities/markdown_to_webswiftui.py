import re
import os
import sys
import json
import markdown

def transform_markdown_to_php(path_to_md_file):

    print('CONVERSION: .md to .php')

    # Open the Markdown file in read ('r') mode with UTF-8 encoding
    # Read the contents of the file and store them as a list of lines
    with open(path_to_md_file, 'r', encoding='utf-8') as file:
        markdown_lines = file.readlines()

    # Initialize an empty string to store the HTML result
    html_text = ""
    counter_figure = 1
    is_first_line = True
    is_code_block_open = False
    is_latex_block_open = False
    
    for line in markdown_lines:
        if is_first_line:
            try:
                # Parse the JSON string
                data = json.loads(line)
                # Extract values
                title     = data["title"]
                body      = data["body"]
                creation  = data["creation"]
                author    = data["author"]
                lectureTime = data["lectureTime"]
                line      = ""
                html_line = f'<?$dataFromPHP["Title"]="{title}"; $dataFromPHP["Description"]="{body}"; $dataFromPHP["Creation"]="{creation}"; $dataFromPHP["Author"]="{author}"; $dataFromPHP["LectureTime"]="{lectureTime}";?>'
            except json.JSONDecodeError as e:
                # Handle JSON parsing error
                print(f"Error JSON not found - ({e})")
                is_first_line = False

        if is_first_line == False:
            # IMAGE
            if re.match(r'!\[([^]]*)\]\(([^)]+)\)', line):
                image_matches = re.findall(r'!\[([^]]*)\]\(([^)]+)\)', line)
                for alt_text, img_src in image_matches:
                    # If it's an image with optional alt text, convert it to an HTML image tag
                    img_src = img_src.replace("https://", "").replace("http://", "")
                    if alt_text:
                        # remove http or https 
                        # create SwiftUI component
                        html_line = f'<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:{img_src};dark:{img_src};alt:{alt_text})"></div><div class="Text t-center" data-SwiftUI=".fontExtension(weight:3;size:7).foregroundColor(3).customPosition(pad:8,12,16)">Fig. {counter_figure}. {alt_text}</div>'
                        counter_figure = counter_figure + 1
                    else:
                        html_line = f'<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:{img_src};dark:{img_src})"></div>'
                    # Replace line with Image component
                    line = line.replace(f'![{alt_text}]({img_src})', html_line)
            # HEADINGS
            elif re.match(r'^(#{1,4}) (.+)$', line):
                # If it's a heading, apply the appropriate regex rule based on the number of '#' symbols
                match = re.match(r'^(#{1,4}) (.+)$', line)
                heading_level = len(match.group(1))
                heading_text = match.group(2)  # Capture only the heading text
                #extr_heading_text = handle_create_internal_link(heading_text)
                if heading_level == 1:
                    html_line = f'<div class="Text" data-SwiftUI=".fontExtension(weight:4;size:2).foregroundColor(2).lineSpacing(1.25).customPosition(pad:48,12,36)">{heading_text}</div>'
                elif heading_level == 2:
                    html_line = f'<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:3).foregroundColor(2).customPosition(pad:12,12,20)">{heading_text}</div>'
                elif heading_level == 3:
                    html_line = f'<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:4).foregroundColor(2).customPosition(pad:12,12,16)">{heading_text}</div>'
                elif heading_level == 4:
                    html_line = f'<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:4).foregroundColor(2).customPosition(pad:12,12,16)">{heading_text}</div>'
            # NORMAL TEXT
            else:      
                html_line, is_code_block_open, is_latex_block_open = handle_text_code_latex(line, is_code_block_open, is_latex_block_open) 
                # Apply the regex rule for normal text

        # Append the HTML line to the result
        html_text += html_line
        is_first_line = False

    # Convert Markdown to HTML
    html_text = markdown.markdown(html_text)
    html_text = html_text.replace("<p>", "")
    html_text = html_text.replace("</p>", "")
    return html_text




def handle_create_internal_link(input_string):
    # Convert the entire string to lowercase
    input_string = input_string.lower()
    # Remove characters that are not a-z, 0-9, and multiple consecutive spaces
    cleaned_string = re.sub(r'[^a-z0-9\s]+', ' ', input_string)
    # Replace spaces with hyphens
    hyphenated_string = re.sub(r'\s+', '-', cleaned_string)
    return hyphenated_string


    
def handle_text_code_latex(line, is_code_block_open, is_latex_block_open):

    execute_text = True    
    is_latex_block_open = False 
    
    if is_code_block_open == False:
        match = re.match(r'^```(\w*)\s*$', line)
        if match:
            language = match.group(1) if match.group(1) else "default"
            is_code_block_open = True
            execute_text = False
            line = re.sub(r'^```(\w*)\s*$', f'<pre data-SwiftUI=".customPosition(pad:12,12,24)"><code data-language="{language}" data-SwiftUI=".BlockCode(r)" >\n', line)
    else:
        if "```" in line:
            is_code_block_open = False
            execute_text = False
            line = line.replace("```", "</pre></code>")


    if "\\[" in line and "\\]" in line:
        is_latex_block_open = True
        line = latexMultiline(line)

    if (execute_text == True and is_code_block_open == False and is_latex_block_open == False):
        line = convert_markdown_elements(line)
        line = re.sub(r'^(?!#)(.+)$', r'<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">\1</div>', line)
                
    return line, is_code_block_open, is_latex_block_open

def latexMultiline(line):
    # LaTeX inline
    extr_multiline_latex = []
    start_index = line.find('\\[')
    while start_index != -1:
        end_index = line.find('\\]', start_index)
        if end_index != -1:
            expression = line[start_index + 2:end_index]  # Remove '\\(' and '\\)'
            extr_multiline_latex.append(expression[:-1])
            start_index = line.find('\\[', end_index)  # Find the next '\\('
        else:
            break
    # Print all extracted expressions
    for expression in extr_multiline_latex:
        string = "\\\["+expression+"\\\]"
        html_tag = '<div class="HStack"><div class="Spacer"></div><span class="SwiftLaTeX" style="display: block; overflow-x: auto; padding: 1em;" data-SwiftUI=".BlockLaTeX(r)">'+expression+'</span><div class="Spacer"></div></div>'
        line = line.replace(string, html_tag)
    return line

def convert_markdown_elements(line):
    # Check for links in the format [text](url)
    if re.search(r'\[([^]]+)\]\(([^)]+)\)', line):
        #print(line)
        link_matches = re.findall(r'\[([^]]+)\]\(([^)]+)\)', line)
        for text, url in link_matches:
            clamped_url = url.replace("https://", "").replace("http://", "")
            html_line = f'<a data-SwiftUI=".onTapGesture(perform:RouteExternal_{clamped_url})">{text}</a>'
            line = line.replace(f'[{text}]({url})', html_line)

    # Handle other Markdown elements here (e.g., bold, italic, code, etc.)
    # Example: Convert **text** to <b>text</b>
    line = re.sub(r'\*\*(.*?)\*\*', r'<span class="t-bold">\1</span>', line)

    # Example: Convert *text* to <i>text</i>
    line = re.sub(r'\*(.*?)\*', r'<span class="t-italic">\1</span>', line)

    # Example: Convert `text` to <code>text</code>
    line = re.sub(r'`(.*?)`', r'<span class="t-code">\1</span>', line)

    def latex_inline(line):
        # LaTeX inline
        extr_inline_latex = []
        start_index = line.find('\\(')
        while start_index != -1:
            end_index = line.find('\\)', start_index)
            if end_index != -1:
                expression = line[start_index + 2:end_index]  # Remove '\\(' and '\\)'
                extr_inline_latex.append(expression[:-1])
                start_index = line.find('\\(', end_index)  # Find the next '\\('
            else:
                break
        # Print all extracted expressions
        for expression in extr_inline_latex:
            string = "\\\("+expression+"\\\)"
            html_tag = '<span class="SwiftLaTeX" data-SwiftUI=".BlockLaTeX(r)">'+expression+'</span>'
            line = line.replace(string, html_tag)
        return line

    line = latex_inline(line)
    return line

def update_file_with_html_result(file_path, content_html_to_swiftui):
    # Open the file in write mode ('w') to overwrite the existing content
    with open(file_path, 'w', encoding='utf-8') as file:
        # Write the new HTML content to the file
        file.write(content_html_to_swiftui)
        print('UPDATED on path\n')



if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python markdown_to_webswiftui.py INPUT_FILE OUTPUT_FOLDER")
        sys.exit(1)

    input_file = sys.argv[1]
    output_folder = sys.argv[2]

    if not os.path.exists(input_file):
        print(f"Error: Input file '{input_file}' not found.")
        sys.exit(1)

    if not os.path.exists(output_folder):
        print(f"Error: Output folder '{output_folder}' not found.")
        sys.exit(1)

    # Extracting file name from the input file path
    file_name = os.path.splitext(os.path.basename(input_file))[0]

    # Checking if the input file is a markdown file
    if not input_file.lower().endswith('.md'):
        print(f"Error: Input file '{input_file}' is not a Markdown file.")
        sys.exit(1)

    # Constructing paths for the markdown and PHP files
    md_file_path = input_file
    php_file_path = os.path.join(output_folder, f'{file_name}.php')

    print(f'Processing: {file_name}')
    
    # Checking if the file exists
    if not os.path.exists(md_file_path):
        print(f"Error: Markdown file '{md_file_path}' not found.")
        sys.exit(1)

    # Transforming markdown to PHP
    content_html_to_swiftui = transform_markdown_to_php(md_file_path)

    # Updating PHP file with HTML result
    update_file_with_html_result(php_file_path, content_html_to_swiftui)

    print(f'Conversion complete. PHP file saved at: {php_file_path}')

