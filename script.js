/* =========================================
   ملف الجافاسكربت الخارجي (External Script)
   موقع روضة عمق الطفولة - CPIS-358
   ========================================= */


/* ---------- 1) الصور والنصوص المتغيرة (Dynamic Picture & Text) ---------- */
var slideImages = ["images/classroom.jpg", "images/softplay.jpg", "images/montessori.jpg", "images/mural.jpg"];
var slideTitles = ["التأسيس والتعلم المبتكر", "ألعاب داخلية وخارجية", "التعليم بمنهج منتسوري", "بيئة مبهجة من أول خطوة"];
var slideTexts = [
    "الحروف والأرقام باللغتين العربية والإنجليزية بأساليب ممتعة وتفاعلية، مع القاعدة البغدادية وتهيئة الطفل للمدرسة.",
    "مساحات لعب آمنة داخل المركز وخارجه، يتحرك فيها الطفل ويلعب مع أقرانه كل يوم.",
    "بيئة تعليمية محفزة وأدوات حسية تنمّي استقلالية الطفل وتربط التعلم بالتجربة العملية.",
    "من الجدار الخارجي إلى الفصول، ألوان ورسومات تخلي الطفل يحب يجي كل يوم."
];
var currentSlide = 0;

function showSlide(index) {
    // إذا تعدّى آخر صورة يرجع للأولى، وإذا نزل عن الأولى يروح للأخيرة
    if (index >= slideImages.length) {
        index = 0;
    } else if (index < 0) {
        index = slideImages.length - 1;
    }
    currentSlide = index;

    document.getElementById("slideImage").src = slideImages[index];
    document.getElementById("slideTitle").innerHTML = slideTitles[index];
    document.getElementById("slideText").innerHTML = slideTexts[index];

    // نرسم النقاط بـ for loop ونلوّن نقطة الصورة الحالية
    var dots = "";
    for (var i = 0; i < slideImages.length; i++) {
        if (i == index) {
            dots += "<span class='dot dot-active'></span>";
        } else {
            dots += "<span class='dot'></span>";
        }
    }
    document.getElementById("dots").innerHTML = dots;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}


/* ---------- 1-ب) آراء أولياء الأمور: نعرض 3 تعليقات ونحركها ---------- */
var firstReview = 0;
var totalReviews = 10;

function showReviews(start) {
    // كم تعليق نعرض؟ 3 في الكمبيوتر، و1 في الجوال
    var perPage = 3;
    if (window.innerWidth < 850) {
        perPage = 1;
    }

    // إذا وصلنا للآخر نرجع للبداية
    if (start > totalReviews - perPage) {
        start = 0;
    } else if (start < 0) {
        start = totalReviews - perPage;
    }
    firstReview = start;

    // نمر على كل التعليقات بـ for loop ونظهر بس اللي في الصفحة الحالية
    for (var i = 0; i < totalReviews; i++) {
        var card = document.getElementById("review" + i);
        if (i >= start && i < start + perPage) {
            card.style.display = "inline-block";
        } else {
            card.style.display = "none";
        }
    }
}

function nextReviews() {
    showReviews(firstReview + 1);
}

function prevReviews() {
    showReviews(firstReview - 1);
}


/* ---------- 2) تأثير المرور بالماوس على الأرقام (mouseover / mouseout) ---------- */
function statOver(x) {
    x.style.backgroundColor = "#F5B323";
    x.style.color = "#2A2140";
}

function statOut(x) {
    x.style.backgroundColor = "transparent";
    x.style.color = "#FFFFFF";
}


/* ---------- 3) الأسئلة الشائعة (تغيير HTML و CSS بالسكربت) ---------- */
function toggleAnswer(number) {
    var box = document.getElementById("question" + number);
    var answer = document.getElementById("answer" + number);
    var sign = document.getElementById("sign" + number);

    if (answer.style.display == "block") {
        answer.style.display = "none";
        sign.innerHTML = "+";
        box.style.borderColor = "#ECE4F7";
    } else {
        answer.style.display = "block";
        sign.innerHTML = "−";
        box.style.borderColor = "#6C3FA6";
    }
}


/* ---------- 4) دوال مساعدة للفورم ---------- */

// لما الحقل ياخذ focus يتلوّن، ولما يطلع منه (blur) يرجع
function highlight(x) {
    x.style.backgroundColor = "#FFFFFF";
    x.style.borderColor = "#6C3FA6";
}

function unhighlight(x) {
    x.style.backgroundColor = "#FAF7FF";
    x.style.borderColor = "#ECE4F7";
}

// نكتب رسالة الخطأ تحت الحقل ونخلي حدوده حمراء
function showError(fieldId, message) {
    document.getElementById(fieldId + "Error").innerHTML = message;
    document.getElementById(fieldId).style.borderColor = "#C0392B";
}

// نمسح رسالة الخطأ ونخلي حدوده خضراء
function clearError(fieldId) {
    document.getElementById(fieldId + "Error").innerHTML = "";
    document.getElementById(fieldId).style.borderColor = "#0E8A78";
}

// نتأكد إن الإيميل فيه @ وبعدها نقطة
function isValidEmail(email) {
    var atPosition = -1;
    var dotPosition = -1;
    for (var i = 0; i < email.length; i++) {
        if (email[i] == "@") {
            atPosition = i;
        }
        if (email[i] == ".") {
            dotPosition = i;
        }
    }
    return atPosition > 0 && dotPosition > atPosition + 1 && dotPosition < email.length - 1;
}

// نتأكد إن الجوال 10 أرقام ويبدأ بـ 05
function isValidPhone(phone) {
    if (phone.length != 10 || phone[0] != "0" || phone[1] != "5") {
        return false;
    }
    var i = 0;
    while (i < phone.length) {
        if (phone[i] < "0" || phone[i] > "9") {
            return false;
        }
        i++;
    }
    return true;
}

// إظهار وإخفاء كلمة المرور بأيقونة العين (تغيير attribute و HTML بالسكربت)
var eyeOpen = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
var eyeClosed = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>';

function togglePassword(fieldId, button) {
    var field = document.getElementById(fieldId);
    if (field.type == "password") {
        field.type = "text";
        button.innerHTML = eyeClosed;
        button.title = "إخفاء كلمة المرور";
    } else {
        field.type = "password";
        button.innerHTML = eyeOpen;
        button.title = "إظهار كلمة المرور";
    }
}


/* ---------- 5) التحقق من فورم تسجيل الدخول (Form Validation) ---------- */
function validateLogin() {
    var ok = true;
    document.getElementById("loginSuccess").style.display = "none";   // نخفي رسالة النجاح القديمة
    var email = document.forms["loginForm"]["loginEmail"].value;
    var password = document.forms["loginForm"]["loginPassword"].value;

    if (email == "") {
        showError("loginEmail", "الرجاء إدخال البريد الإلكتروني");
        ok = false;
    } else if (!isValidEmail(email)) {
        showError("loginEmail", "صيغة البريد الإلكتروني غير صحيحة");
        ok = false;
    } else {
        clearError("loginEmail");
    }

    if (password == "") {
        showError("loginPassword", "الرجاء إدخال كلمة المرور");
        ok = false;
    } else if (password.length < 8) {
        showError("loginPassword", "كلمة المرور 8 خانات على الأقل");
        ok = false;
    } else {
        clearError("loginPassword");
    }

    if (ok) {
        var box = document.getElementById("loginSuccess");
        box.innerHTML = "أهلًا بك! تم تسجيل الدخول بنجاح.";
        box.style.display = "block";
    }
    return false;   // ما نرسل الفورم لأنه ما فيه سيرفر
}


/* ---------- 6) التحقق من فورم إنشاء الحساب ---------- */
function validateSignup() {
    var ok = true;
    document.getElementById("signupSuccess").style.display = "none";  // نخفي رسالة النجاح القديمة
    var form = document.forms["signupForm"];

    var name = form["parentName"].value;
    var phone = form["phone"].value;
    var email = form["email"].value;
    var password = form["password"].value;
    var confirmPass = form["confirmPassword"].value;
    var childName = form["childName"].value;
    var childAge = form["childAge"].value;
    var level = form["level"].value;

    // بيانات ولي الأمر
    if (name.length < 3) {
        showError("parentName", "الاسم لازم يكون 3 أحرف على الأقل");
        ok = false;
    } else {
        clearError("parentName");
    }

    if (!isValidPhone(phone)) {
        showError("phone", "رقم الجوال لازم يبدأ بـ 05 ويكون 10 أرقام");
        ok = false;
    } else {
        clearError("phone");
    }

    if (!isValidEmail(email)) {
        showError("email", "صيغة البريد الإلكتروني غير صحيحة");
        ok = false;
    } else {
        clearError("email");
    }

    if (password.length < 8) {
        showError("password", "كلمة المرور 8 خانات على الأقل");
        ok = false;
    } else {
        clearError("password");
    }

    if (confirmPass == "" || confirmPass != password) {
        showError("confirmPassword", "كلمتا المرور غير متطابقتين");
        ok = false;
    } else {
        clearError("confirmPassword");
    }

    // بيانات الطفل
    if (childName == "") {
        showError("childName", "الرجاء إدخال اسم الطفل");
        ok = false;
    } else {
        clearError("childName");
    }

    if (childAge == "") {
        showError("childAge", "الرجاء إدخال عمر الطفل");
        ok = false;
    } else {
        clearError("childAge");
    }

    // نحدد الأعمار المسموحة لكل مستوى بـ switch
    var min, max, levelName, rangeText;
    switch (level) {
        case "infant": min = 0; max = 0; levelName = "رعاية الرضّع"; rangeText = "لأقل من سنة"; break;
        case "nursery": min = 1; max = 2; levelName = "الحضانة التعليمية"; rangeText = "من سنة إلى سنتين"; break;
        case "kg1": min = 3; max = 3; levelName = "روضة أولى"; rangeText = "لعمر 3 سنوات"; break;
        case "kg2": min = 4; max = 4; levelName = "روضة ثانية"; rangeText = "لعمر 4 سنوات"; break;
        case "kg3": min = 5; max = 5; levelName = "روضة ثالثة"; rangeText = "لعمر 5 سنوات"; break;
        case "after": min = 6; max = 10; levelName = "ما بعد المدرسة"; rangeText = "من 6 إلى 10 سنوات"; break;
        default: levelName = "";
    }

    if (levelName == "") {
        showError("level", "الرجاء اختيار المستوى");
        ok = false;
    } else if (childAge != "") {
        var age = parseInt(childAge);
        if (age < min || age > max) {
            showError("level", "عمر الطفل " + age + " سنوات، ومستوى " + levelName + " " + rangeText);
            ok = false;
        } else {
            clearError("level");
        }
    }

    if (!form["terms"].checked) {
        document.getElementById("termsError").innerHTML = "لازم توافق على الشروط";
        ok = false;
    } else {
        document.getElementById("termsError").innerHTML = "";
    }

    if (ok) {
        var box = document.getElementById("signupSuccess");
        box.innerHTML = "تم إرسال طلب تسجيل " + childName + " بنجاح، بنتواصل معك قريبًا.";
        box.style.display = "block";
    }
    return false;   // ما نرسل الفورم لأنه ما فيه سيرفر
}
