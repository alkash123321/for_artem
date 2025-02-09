document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const compatibilityForm = document.getElementById("compatibility-form")
  const resultSection = document.getElementById("result")
  const compatibilityCircle = document.querySelector(".circle")
  const compatibilityPercentage = document.querySelector(".percentage")
  const compatibilityMessage = document.getElementById("compatibility-message")
  const themeTransitionOverlay = document.getElementById("theme-transition-overlay")

  // Функциональность переключения темы
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }

  function updateThemeTransition(event) {
    const x = event.clientX / window.innerWidth
    const y = event.clientY / window.innerHeight
    document.documentElement.style.setProperty("--x", x * 100 + "%")
    document.documentElement.style.setProperty("--y", y * 100 + "%")
  }

  function toggleTheme(event) {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    updateThemeTransition(event)
    document.body.classList.add("theme-transition")

    requestAnimationFrame(() => {
      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)

      setTimeout(() => {
        document.body.classList.remove("theme-transition")
      }, 500)
    })
  }

  // Проверка сохраненной темы или использование системных настроек
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    setTheme(savedTheme)
  } else {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    setTheme(prefersDarkScheme.matches ? "dark" : "light")
  }

  // Добавление обработчика события для кнопки переключения темы
  themeToggle.addEventListener("click", toggleTheme)

  document.documentElement.style.setProperty("--x", "100%")
  document.documentElement.style.setProperty("--y", "0%")

  // Функциональность калькулятора совместимости
  function calculateCompatibility(name1, birthdate1, name2, birthdate2) {
    // Проверка на специальную фразу
    if (checkSpecialPhrase(name1) || checkSpecialPhrase(name2)) {
      return 100
    }

    // Оригинальный алгоритм совместимости
    const nameCompatibility = ((name1.length + name2.length) % 15) * 6

    const date1 = new Date(birthdate1)
    const date2 = new Date(birthdate2)
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    const dateCompatibility = ((daysDiff % 100) + Math.abs(date1.getMonth() - date2.getMonth()) * 5) % 60

    const zodiacCompatibility = getZodiacCompatibility(date1, date2)

    const totalCompatibility = (nameCompatibility + dateCompatibility + zodiacCompatibility) / 3
    return Math.round(totalCompatibility)
  }

  function checkSpecialPhrase(name) {
    const normalizedName = name.toLowerCase().replace(/\s+/g, "").replace(/ё/g, "е")
    return normalizedName.includes("членволоди")
  }

  function getZodiacSign(date) {
    const month = date.getMonth() + 1
    const day = date.getDate()

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Овен"
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Телец"
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Близнецы"
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Рак"
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Лев"
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Дева"
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Весы"
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Скорпион"
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Стрелец"
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Козерог"
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Водолей"
    return "Рыбы"
  }

  function getZodiacCompatibility(date1, date2) {
    const sign1 = getZodiacSign(date1)
    const sign2 = getZodiacSign(date2)

    // Простая таблица совместимости (можно расширить для более точных результатов)
    const compatibilityTable = {
      Овен: {
        Овен: 70,
        Телец: 60,
        Близнецы: 80,
        Рак: 65,
        Лев: 90,
        Дева: 55,
        Весы: 75,
        Скорпион: 85,
        Стрелец: 95,
        Козерог: 50,
        Водолей: 70,
        Рыбы: 65,
      },
      Телец: {
        Овен: 60,
        Телец: 80,
        Близнецы: 70,
        Рак: 85,
        Лев: 65,
        Дева: 90,
        Весы: 75,
        Скорпион: 80,
        Стрелец: 55,
        Козерог: 95,
        Водолей: 60,
        Рыбы: 85,
      },
      Близнецы: {
        Овен: 80,
        Телец: 70,
        Близнецы: 85,
        Рак: 60,
        Лев: 85,
        Дева: 75,
        Весы: 90,
        Скорпион: 70,
        Стрелец: 85,
        Козерог: 55,
        Водолей: 95,
        Рыбы: 65,
      },
      Рак: {
        Овен: 65,
        Телец: 85,
        Близнецы: 60,
        Рак: 90,
        Лев: 70,
        Дева: 80,
        Весы: 65,
        Скорпион: 95,
        Стрелец: 55,
        Козерог: 75,
        Водолей: 60,
        Рыбы: 90,
      },
      Лев: {
        Овен: 90,
        Телец: 65,
        Близнецы: 85,
        Рак: 70,
        Лев: 85,
        Дева: 60,
        Весы: 80,
        Скорпион: 75,
        Стрелец: 90,
        Козерог: 55,
        Водолей: 70,
        Рыбы: 65,
      },
      Дева: {
        Овен: 55,
        Телец: 90,
        Близнецы: 75,
        Рак: 80,
        Лев: 60,
        Дева: 85,
        Весы: 70,
        Скорпион: 85,
        Стрелец: 65,
        Козерог: 90,
        Водолей: 75,
        Рыбы: 80,
      },
      Весы: {
        Овен: 75,
        Телец: 75,
        Близнецы: 90,
        Рак: 65,
        Лев: 80,
        Дева: 70,
        Весы: 85,
        Скорпион: 80,
        Стрелец: 75,
        Козерог: 70,
        Водолей: 90,
        Рыбы: 75,
      },
      Скорпион: {
        Овен: 85,
        Телец: 80,
        Близнецы: 70,
        Рак: 95,
        Лев: 75,
        Дева: 85,
        Весы: 80,
        Скорпион: 90,
        Стрелец: 70,
        Козерог: 85,
        Водолей: 65,
        Рыбы: 95,
      },
      Стрелец: {
        Овен: 95,
        Телец: 55,
        Близнецы: 85,
        Рак: 55,
        Лев: 90,
        Дева: 65,
        Весы: 75,
        Скорпион: 70,
        Стрелец: 85,
        Козерог: 70,
        Водолей: 90,
        Рыбы: 60,
      },
      Козерог: {
        Овен: 50,
        Телец: 95,
        Близнецы: 55,
        Рак: 75,
        Лев: 55,
        Дева: 90,
        Весы: 70,
        Скорпион: 85,
        Стрелец: 70,
        Козерог: 85,
        Водолей: 75,
        Рыбы: 80,
      },
      Водолей: {
        Овен: 70,
        Телец: 60,
        Близнецы: 95,
        Рак: 60,
        Лев: 70,
        Дева: 75,
        Весы: 90,
        Скорпион: 65,
        Стрелец: 90,
        Козерог: 75,
        Водолей: 85,
        Рыбы: 80,
      },
      Рыбы: {
        Овен: 65,
        Телец: 85,
        Близнецы: 65,
        Рак: 90,
        Лев: 65,
        Дева: 80,
        Весы: 75,
        Скорпион: 95,
        Стрелец: 60,
        Козерог: 80,
        Водолей: 80,
        Рыбы: 90,
      },
    }

    return compatibilityTable[sign1][sign2]
  }

  function getCompatibilityMessage(percentage) {
    if (percentage === 100) {
      return "Невероятно! У вас идеальная совместимость!"
    } else if (percentage >= 80) {
      return "Вау! У вас потрясающая совместимость!"
    } else if (percentage >= 60) {
      return "У вас хорошая совместимость. Стоит попробовать!"
    } else if (percentage >= 40) {
      return "Есть потенциал, но вам, возможно, придется поработать над отношениями."
    } else {
      return "Возможно, вам лучше остаться друзьями."
    }
  }

  // Функция для проверки имени
  function isValidName(name) {
    return /^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name)
  }

  // Функция для проверки даты
  function isValidDate(date) {
    const inputDate = new Date(date)
    const currentDate = new Date()
    const maxDate = new Date("2025-12-31")
    return inputDate <= maxDate && inputDate <= currentDate
  }

  // Функция для отображения ошибки
  function showError(inputId, message) {
    const errorSpan = document.getElementById(`${inputId}-error`)
    errorSpan.textContent = message
    document.getElementById(inputId).classList.add("invalid")
  }

  // Функция для очистки ошибок
  function clearErrors() {
    const errorSpans = document.querySelectorAll(".error")
    errorSpans.forEach((span) => (span.textContent = ""))
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input) => input.classList.remove("invalid"))
  }

  compatibilityForm.addEventListener("submit", (e) => {
    e.preventDefault()
    clearErrors()

    const name1 = document.getElementById("name1").value
    const birthdate1 = document.getElementById("birthdate1").value
    const name2 = document.getElementById("name2").value
    const birthdate2 = document.getElementById("birthdate2").value

    let isValid = true

    if (!isValidName(name1)) {
      showError("name1", "Пожалуйста, введите корректное имя (только буквы)")
      isValid = false
    }

    if (!isValidName(name2)) {
      showError("name2", "Пожалуйста, введите корректное имя (только буквы)")
      isValid = false
    }

    if (!isValidDate(birthdate1)) {
      showError("birthdate1", "Пожалуйста, введите корректную дату (до 2025 года)")
      isValid = false
    }

    if (!isValidDate(birthdate2)) {
      showError("birthdate2", "Пожалуйста, введите корректную дату (до 2025 года)")
      isValid = false
    }

    if (!isValid) {
      return
    }

    const compatibility = calculateCompatibility(name1, birthdate1, name2, birthdate2)

    compatibilityCircle.style.stroke = `hsl(${compatibility * 1.2}, 70%, 50%)`
    compatibilityCircle.style.strokeDasharray = `${compatibility}, 100`
    compatibilityPercentage.textContent = `${compatibility}%`
    compatibilityMessage.textContent = getCompatibilityMessage(compatibility)

    resultSection.classList.remove("hidden")

    // Плавная прокрутка к результату
    resultSection.scrollIntoView({ behavior: "smooth" })
  })
})

