const fileInput = document.querySelector('#image');
            const preview = document.querySelector('#image-preview');
        
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            });