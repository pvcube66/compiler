document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror with enhanced settings
    const editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
        lineNumbers: true,
        mode: "text/x-java",
        theme: "dracula",
        indentUnit: 4,
        indentWithTabs: true,
        lineWrapping: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Tab": function(cm) {
                if (cm.somethingSelected()) {
                    cm.indentSelection("add");
                } else {
                    cm.replaceSelection(Array(cm.getOption("indentUnit") + 1).join(" "));
                }
            }
        }
    });
    
    // Add visual feedback when editor gets focus
    editor.on("focus", function() {
        editor.getWrapperElement().classList.add("editor-focused");
    });
    
    editor.on("blur", function() {
        editor.getWrapperElement().classList.remove("editor-focused");
    });
    
    // Language selection handler with improved templates
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        const language = this.value;
        
        let mode;
        let template = '';
        
        switch(language) {
            case 'java':
                mode = 'text/x-java';
                template = '/**\n * Java Example\n */\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
                break;
            case 'python':
                mode = 'text/x-python';
                template = '# Python Example\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nif __name__ == "__main__":\n    print(greet("World"))';
                break;
            case 'javascript':
                mode = 'text/javascript';
                template = '/**\n * JavaScript Example\n */\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));';
                break;
            case 'c':
                mode = 'text/x-csrc';
                template = '/**\n * C Example\n */\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}';
                break;
            case 'cpp':
                mode = 'text/x-c++src';
                template = '/**\n * C++ Example\n */\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}';
                break;
        }
        
        editor.setOption('mode', mode);
        
        // Offer to replace with template
        if (editor.getValue().trim() === '' || confirm('Replace current code with template?')) {
            editor.setValue(template);
            // Animate the editor content change
            animateElement(editor.getWrapperElement());
        }
    });
    
    // Run button with enhanced user feedback
    const runButton = document.getElementById('runButton');
    const output = document.getElementById('output');
    
    runButton.addEventListener('click', function() {
        const code = editor.getValue();
        const input = document.getElementById('input').value;
        const language = languageSelect.value;
        
        // Show loading state with animation
        output.textContent = "Compiling and running your code...";
        output.classList.add("loading");
        runButton.disabled = true;
        runButton.innerHTML = '<span class="spinner"></span> Running...';
        
        // Add subtle button animation
        animateElement(runButton);
        
        // Create request payload
        const payload = {
            script: code,
            language: language,
            versionIndex: "0",
            stdin: input
        };
        
        // Send code to backend
        fetch('/api/compiler/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setTimeout(() => { // Small delay for better UX
                output.classList.remove("loading");
                
                if (data.error) {
                    output.innerHTML = `<span class="error-output">Error: ${formatOutput(data.error)}</span>`;
                } else {
                    // Format output with syntax highlighting if possible
                    output.innerHTML = formatOutput(data.output);
                }
                
                // Animate the result appearance
                animateElement(output);
            }, 300);
        })
        .catch(error => {
            output.classList.remove("loading");
            output.innerHTML = `<span class="error-output">Error: ${error.message}</span>`;
            animateElement(output);
        })
        .finally(() => {
            setTimeout(() => {
                runButton.disabled = false;
                runButton.textContent = "Run Code";
            }, 300);
        });
    });
    
    // Format code output with some basic highlighting
    function formatOutput(text) {
        if (!text) return "No output";
        
        // Escape HTML
        text = text.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;')
                   .replace(/'/g, '&#039;');
        
        // Add some basic syntax highlighting
        text = text.replace(/\b(public|private|protected|class|void|int|double|String|boolean|true|false|null|if|else|for|while)\b/g, 
                          '<span class="keyword">$1</span>');
        
        // Highlight errors
        text = text.replace(/(Exception|Error|error|ERROR|Exception in thread|at java\.)/g, 
                          '<span class="error">$1</span>');
                          
        return text;
    }
    
    // Simple animation function for UI elements
    function animateElement(element) {
        element.classList.add('animate-pulse');
        setTimeout(() => {
            element.classList.remove('animate-pulse');
        }, 800);
    }
    
    // Add pulse animation CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.8; }
            100% { opacity: 1; }
        }
        .animate-pulse {
            animation: pulse 0.8s ease-in-out;
        }
        .editor-focused {
            box-shadow: 0 0 0 3px rgba(58, 123, 213, 0.3);
        }
        .error-output {
            color: #d9534f;
            font-weight: 500;
        }
        .keyword {
            color: #0066cc;
            font-weight: bold;
        }
        .error {
            color: #d9534f;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-right: 8px;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize with animation
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            animateElement(card);
        });
    }, 300);
});