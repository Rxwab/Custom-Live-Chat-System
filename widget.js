(function() {
    // 1. قراءة التوكن (الرمز الفريد) من وسم السكريبت
    const scriptTag = document.currentScript;
    const token = scriptTag.getAttribute('data-chat-token') || 'NO_TOKEN_PROVIDED';
    // عنوان نقطة الاتصال الخلفية (يجب عليك تغييره إلى خادمك الفعلي لاحقًا)
    const BACKEND_URL = 'YOUR_FUTURE_API_ENDPOINT'; 

    console.log(`[CustomChat] Loaded with Token: ${token}`);
    
    // 2. بناء الأنماط (Styles) - جلب ملف CSS
    function loadStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        // يفترض أن ملف widget.css موجود في نفس مسار widget.js
        link.href = new URL('widget.css', scriptTag.src).href;
        document.head.appendChild(link);
    }
    
    // 3. بناء واجهة الشات (الزر العائم والصندوق)
    function buildChatWidget() {
        const container = document.createElement('div');
        container.id = 'custom-chat-container';
        container.className = 'rtl'; // لدعم اللغة العربية

        // **أ. الزر العائم الديناميكي**
        container.innerHTML = `
            <button id="chat-button" class="chat-button">
                <svg id="chat-icon-open" viewBox="0 0 24 24" fill="currentColor" class="chat-icon">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                 <svg id="chat-icon-close" viewBox="0 0 24 24" fill="currentColor" class="chat-icon icon-close hidden">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
            
            <div id="chat-window" class="chat-window hidden">
                <div class="chat-header">
                    <div class="header-info">
                        <h3 class="chat-title">فريق الدعم المباشر</h3>
                        <p id="agent-status" class="agent-status online">متصل الآن، سنرد في ثوان</p>
                    </div>
                </div>
                <div id="chat-messages" class="chat-messages">
                    <div class="welcome-message">
                       مرحباً! لقد تم التعرف على التوكن الخاص بك بنجاح. كيف يمكننا مساعدتك اليوم؟ (التوكن: ${token})
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="اكتب رسالتك..." class="chat-input">
                    <button id="send-button" class="send-button">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
        
        // 4. إضافة وظيفة التبديل (Toggle)
        const chatButton = document.getElementById('chat-button');
        const chatWindow = document.getElementById('chat-window');
        const iconOpen = document.getElementById('chat-icon-open');
        const iconClose = document.getElementById('chat-icon-close');

        function toggleChat() {
            chatWindow.classList.toggle('hidden');
            if (chatWindow.classList.contains('hidden')) {
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
            } else {
                iconOpen.classList.add('hidden');
                iconClose.classList.remove('hidden');
                document.getElementById('chat-input').focus();
            }
        }

        chatButton.addEventListener('click', toggleChat);


        // 5. وظيفة الإرسال 
        const sendButton = document.getElementById('send-button');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');

        sendButton.addEventListener('click', () => {
            const messageText = chatInput.value.trim();
            if (messageText) {
                // عرض الرسالة المرسلة محلياً (محاكاة)
                const msgElement = document.createElement('div');
                msgElement.className = 'message sent';
                msgElement.textContent = messageText;
                chatMessages.appendChild(msgElement);
                
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // **هنا سيتم إضافة كود WebSocket لإرسال الرسالة إلى الخادم باستخدام الـ (Token)**
                // sendToBackend(token, messageText); 

                chatInput.value = ''; 
            }
        });
        
        chatInput.addEventListener('keypress', (e) => {
             if (e.key === 'Enter') {
                 e.preventDefault(); 
                 sendButton.click();
             }
         });
    }

    loadStyles();
    buildChatWidget();
})();
