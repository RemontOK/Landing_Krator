import { useEffect } from "react";

const products = [
  { title: "МУВП-1", power: "6,3 Н·м", price: "от 6 500 ₽", text: "Для компактных приводов и небольших нагрузок." },
  { title: "МУВП-2", power: "16 Н·м", price: "от 6 900 ₽", text: "Базовое решение для маломощных электроприводов." },
  { title: "МУВП-3", power: "31,5 Н·м", price: "от 7 200 ₽", text: "Стартовый промышленный типоразмер линейки МУВП." },
  { title: "МУВП-4", power: "63 Н·м", price: "от 7 600 ₽", text: "Подходит для типовых узлов насосного оборудования." },
  { title: "МУВП-5", power: "125 Н·м", price: "от 10 400 ₽", text: "Баланс между компактностью и рабочей нагрузкой." },
  { title: "МУВП-6", power: "250 Н·м", price: "от 12 500 ₽", text: "Частый вариант для стабильной промышленной эксплуатации." },
  { title: "МУВП-7", power: "500 Н·м", price: "от 17 980 ₽", text: "Для приводов со средними динамическими нагрузками." },
  { title: "МУВП-8", power: "710 Н·м", price: "от 22 000 ₽", text: "Используется в более тяжелых режимах работы оборудования." },
  { title: "МУВП-9", power: "1000 Н·м", price: "от 24 500 ₽", text: "Для узлов, где важны демпфирование и стабильная передача момента." },
  { title: "МУВП-10", power: "2000 Н·м", price: "от 36 900 ₽", text: "Подходит для серьезных приводов и ремонтных комплектов под замену." },
  { title: "МУВП-11", power: "4000 Н·м", price: "от 55 000 ₽", text: "Для тяжелого промышленного оборудования и крановых механизмов." },
  { title: "МУВП-12 / МУВП-13", power: "8000-16000 Н·м", price: "от 110 000 ₽", text: "Крупные типоразмеры под высокий момент и ответственные приводы." }
];

const features = [
  {
    title: "Что входит в конструкцию",
    text: "Две полумуфты, стальные пальцы и упругие втулки или кольца. Эластичные элементы гасят удары и снижают динамические нагрузки."
  },
  {
    title: "Как читается обозначение",
    text: "Маркировка показывает номинальный крутящий момент, диаметры посадочных отверстий, исполнения полумуфт и климатическое исполнение."
  },
  {
    title: "Температура эксплуатации",
    text: "Для резиновых элементов обычно используют диапазон от -45 до +70 °C, для полиуретановых от -60 до +80 °C."
  },
  {
    title: "Где применяются",
    text: "Электродвигатели, насосы, крановые механизмы, приводы машин и другое оборудование, где нужно передавать момент между соосными валами."
  }
];

const benefits = [
  {
    number: "01",
    title: "Сразу говорим, что подойдет",
    text: "Не оставляем клиента один на один с маркировкой, исполнениями и посадочными диаметрами."
  },
  {
    number: "02",
    title: "Собираем КП под закупку",
    text: "Удобно для снабжения, ремонта оборудования, плановой замены и тендерных запросов."
  },
  {
    number: "03",
    title: "Работаем с широким диапазоном моментов",
    text: "От небольших приводов до тяжелых промышленных узлов в одной продуктовой линейке."
  }
];

function App() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    nodes.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const comment = String(formData.get("comment") || "").trim();

    const subject = encodeURIComponent("Заявка с лендинга: Муфты МУВП");
    const body = encodeURIComponent(
      [
        "Новая заявка с лендинга МУВП",
        "",
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        `Комментарий: ${comment || "-"}`,
        "",
        "Прошу связаться и подобрать муфту МУВП."
      ].join("\n")
    );

    window.location.href = `mailto:n-crator@mail.ru?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#hero" aria-label="Насос-Кратор">
          <span className="brand__eyebrow">Насос-Кратор</span>
          <span className="brand__title">Муфты МУВП</span>
        </a>
        <nav className="topbar__nav">
          <a href="#catalog">Типоразмеры</a>
          <a href="#about">О муфтах</a>
          <a href="#contact">Контакты</a>
        </nav>
        <a className="topbar__phone" href="tel:+73433822261">
          +7 (343) 38-222-61
        </a>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero__copy panel" data-reveal>
            <p className="section-kicker">Муфты по ГОСТ 21424-93</p>
            <h1>Подберем муфту МУВП под ваш привод, вал и крутящий момент</h1>
            <p className="hero__lead">
              Поставляем муфты МУВП от типоразмера 1 до 13. Помогаем быстро подобрать
              исполнение, диаметр посадки и комплектацию под электродвигатели, насосы,
              крановые механизмы и промышленное оборудование.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#contact">
                Запросить цену и КП
              </a>
              <a className="button button--ghost" href="#catalog">
                Смотреть типоразмеры
              </a>
            </div>
            <ul className="hero__facts">
              <li>В наличии и под заказ</li>
              <li>Момент от 6,3 до 16000 Н·м</li>
              <li>Отгрузка из Екатеринбурга</li>
            </ul>
          </div>

          <div className="hero__visual panel" data-reveal>
            <div className="hero-card hero-card--main">
              <img
                src="https://n-krator.ru/wa-data/public/shop/products/62/30/3062/images/27296/27296.970.jpg"
                alt="Муфта МУВП"
              />
              <div className="hero-card__overlay">
                <span>Муфта МУВП</span>
                <strong>для соосных валов и приводов с малыми и средними моментами</strong>
              </div>
            </div>
            <div className="hero-card hero-card--accent">
              <span className="hero-card__number">13</span>
              <span className="hero-card__caption">типоразмеров в линейке</span>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="trust-strip__item panel panel--light" data-reveal>
            <strong>Подбор под задачу</strong>
            <span>по диаметрам валов, моменту и исполнению</span>
          </div>
          <div className="trust-strip__item panel panel--light" data-reveal>
            <strong>Быстрый ответ</strong>
            <span>с ценой, наличием и коммерческим предложением</span>
          </div>
          <div className="trust-strip__item panel panel--light" data-reveal>
            <strong>Поставка для юрлиц и частников</strong>
            <span>удобно для закупки, ремонта и замены узлов</span>
          </div>
        </section>

        <section className="section" id="catalog">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Ассортимент</p>
            <h2>Основные типоразмеры МУВП</h2>
            <p>
              На основе текущего каталога `n-krator.ru`. Если нужен точный подбор по
              посадке, исполнению и наличию, отправьте запрос, подготовим КП под ваш узел.
            </p>
          </div>

          <div className="catalog-grid">
            {products.map((product) => (
              <article className="product-card panel" data-reveal key={product.title}>
                <span className="product-card__power">{product.power}</span>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
                <div className="product-card__price">{product.price}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Что важно знать</p>
            <h2>МУВП: конструкция, маркировка и рабочие условия</h2>
          </div>

          <div className="about-grid">
            {features.map((feature) => (
              <article className="info-card panel" data-reveal key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Почему через нас</p>
            <h2>Лендинг не про каталог, а про быстрый выбор и заявку</h2>
          </div>

          <div className="benefits-layout">
            <div className="benefits-list">
              {benefits.map((benefit) => (
                <article className="benefit panel panel--light" data-reveal key={benefit.number}>
                  <span>{benefit.number}</span>
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="spec-panel panel" data-reveal>
              <p className="spec-panel__kicker">Быстрый ориентир</p>
              <h3>Что обычно спрашиваем перед подбором</h3>
              <ul>
                <li>Номинальный крутящий момент</li>
                <li>Диаметры обоих валов</li>
                <li>Исполнение отверстий: цилиндрическое или коническое</li>
                <li>Условия работы и температура</li>
                <li>Нужна муфта в сборе или только упругие элементы</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="cta__box panel" data-reveal>
            <div className="cta__copy">
              <p className="section-kicker">Запрос за 1 минуту</p>
              <h2>Отправьте параметры узла, и мы подберем нужную МУВП</h2>
              <p>
                Если точный типоразмер неизвестен, достаточно прислать мощность, обороты,
                диаметр валов или фото шильдика. Подскажем, какая муфта подойдет.
              </p>
            </div>
            <a className="button button--primary" href="#contact">
              Оставить заявку
            </a>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Контакты</p>
            <h2>Запросить цену, наличие или подбор</h2>
          </div>

          <div className="contact-layout">
            <div className="contact-card panel" data-reveal>
              <h3>Насос-Кратор</h3>
              <ul className="contact-list">
                <li>
                  <span>Телефон</span>
                  <a href="tel:+73433822261">+7 (343) 38-222-61</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href="mailto:n-crator@mail.ru">n-crator@mail.ru</a>
                </li>
                <li>
                  <span>Адрес</span>
                  <strong>Екатеринбург, ул. Ангарская, 77, офис 214</strong>
                </li>
                <li>
                  <span>Каталог</span>
                  <a
                    href="https://n-krator.ru/category/mufty/mufty-muvp/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Открыть основную категорию
                  </a>
                </li>
              </ul>
            </div>

            <form className="lead-form panel" onSubmit={onSubmit} data-reveal>
              <label>
                <span>Ваше имя</span>
                <input type="text" name="name" placeholder="Как к вам обращаться" required />
              </label>
              <label>
                <span>Телефон</span>
                <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required />
              </label>
              <label>
                <span>Что нужно</span>
                <textarea
                  name="comment"
                  rows="5"
                  placeholder="Например: нужна МУВП под насосный агрегат, диаметр валов 38 и 42 мм"
                />
              </label>
              <button className="button button--primary" type="submit">
                Сформировать заявку
              </button>
              <p className="lead-form__hint">
                Форма открывает подготовленное письмо в вашей почтовой программе. Можно быстро
                передать запрос менеджеру без backend.
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
