// ==================== PRELOADER ====================
(function() {
    // Добавляем класс для скрытия контента при загрузке
    document.body.classList.add('preloading');
    
    // Минимальное время показа прелоадера
    // Анимация изображения: 0.9с (начало) + 3.1с (длительность) = 4.0с
    // Добавляем 1 секунду после исчезновения картинки = 5.0с
    const MIN_DISPLAY_TIME = 5000;
    const startTime = Date.now();
    
    // Функция скрытия прелоадера
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);
        
        setTimeout(function() {
            // Запускаем анимацию отрывания
            preloader.classList.add('preloader--hidden');
            document.body.classList.remove('preloading');
            
            // Удаляем прелоадер из DOM после завершения анимации
            setTimeout(function() {
                preloader.remove();
                // Разрешаем скролл
                document.body.style.overflow = '';
            }, 1500);
        }, remainingTime);
    }
    
    // Ждем полной загрузки всех ресурсов (картинок, шрифтов)
    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }
    
    // Fallback: если что-то пошло не так, скрываем прелоадер через 7 секунд
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('preloader--hidden')) {
            hidePreloader();
        }
    }, 7000);
})();