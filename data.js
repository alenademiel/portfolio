/* ==========================================================================
   СПИСОК РАБОТ
   Единственный файл, который нужно править, чтобы добавить или убрать работу.

   Как добавить фотографию:
   1. Положите файл в нужную папку, например assets/images/food/
   2. Скопируйте любой блок { ... }, ниже, вставьте его в список works
      и поменяйте значения. Не забудьте запятую после закрывающей скобки }.

   Поля работы:
     title        название — видно только в полноэкранном просмотре (необязательно)
     category     'food' | 'product' | 'people'  — id из списка categories ниже
     type         'photo' или 'video'
     src          путь к файлу
     year         год (необязательно)
     description  короткое описание, видно в полноэкранном просмотре (необязательно)
     project      название проекта или съёмки (необязательно)
     alt          описание картинки для тех, кто её не видит; если не указано — берётся title
     ratio        пропорции заглушки, пока файла нет: '4:5', '3:2', '1:1'...
                  Когда фото загрузится, сайт сам возьмёт его настоящие пропорции.
     featured     true — работа встанет в сетке на всю ширину (лучше для горизонтальных кадров)
     poster       только для видео: картинка-обложка до начала воспроизведения

   Порядок работ на сайте = порядок в этом списке.
   ========================================================================== */

window.PORTFOLIO = {

  /* Общий раздел «Все работы» в фильтре. false — его нет, сайт открывается на первой категории.
     Чтобы вернуть, поставьте true. */
  showAll: false,

  /* Сколько фотографий показывать сразу; остальные открываются кнопкой «Показать ещё». */
  perPage: 24,

  /* Категории = кнопки фильтра, в этом же порядке. label — то, что написано на кнопке.
     Первая категория открыта по умолчанию. */
  categories: [
    { id: 'food',    label: 'Food & Lifestyle' },
    { id: 'product', label: 'Предметная съёмка' },
    { id: 'people',  label: 'Люди' }
  ],

  /* Порядок работ внутри категории = порядок строк.
     К любой работе можно добавить title: '...', year: 2026, description: '...' — они появятся
     в полноэкранном просмотре. */
  works: [
    { category: 'people', type: 'photo', src: 'assets/images/people/people-10.jpg', ratio: '2:3',
      alt: 'Портрет девушки со светлыми волосами в жёлтых очках и горчичном свитере' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-07.jpg', ratio: '3:4',
      alt: 'Горящая свеча в стеклянной банке на фоне заката' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-03.jpg', ratio: '2:3',
      alt: 'Печенье-сэндвич, наполовину в шоколаде с цветной посыпкой, на белой тарелке' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-06.jpg', ratio: '2:3',
      alt: 'Крупный портрет молодого человека у окна в синем свете' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-03.jpg', ratio: '3:4',
      alt: 'Свеча с деревянным фитилём в чёрной банке и цветок хлопка' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-01.jpg', ratio: '2:3',
      alt: 'Шоколадный кейк-попс в виде мишки на белой тарелке' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-03.jpg', ratio: '2:3',
      alt: 'Девушка с кудрявыми волосами в вагоне трамвая, вид в профиль' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-13.jpg', ratio: '2:3',
      alt: 'Свеча в гипсовом подсвечнике с веточкой эвкалипта' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-08.jpg', ratio: '3:4',
      alt: 'Печенье в шоколаде на белой тарелке на деревянном столе, вид сверху' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-05.jpg', ratio: '2:3',
      alt: 'Девушка в жёлтом свитере сидит на залитой солнцем площадке, тени от ограды' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-10.jpg', ratio: '3:4',
      alt: 'Аромадиффузор с чёрными палочками в янтарном флаконе' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-05.jpg', ratio: '2:3',
      alt: 'Печенье на тарелке рядом с настольной лампой и стеклянной банкой со свечой' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-12.jpg', ratio: '2:3',
      alt: 'Пара: молодой человек наклонился к девушке со светлыми волосами' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-01.jpg', ratio: '3:4',
      alt: 'Флаконы аромамасел с этикетками в белой бумажной стружке' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-07.jpg', ratio: '3:4',
      alt: 'Крупный план: шоколадная глазурь с цветной посыпкой на печенье' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-01.jpg', ratio: '2:3',
      alt: 'Молодой человек в чёрно-белом пуховике у деревянной двери на вечерней улице' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-06.jpg', ratio: '3:4',
      alt: 'Свечи в банках из тёмного янтарного стекла' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-02.jpg', ratio: '2:3',
      alt: 'Шоколадный кейк-попс на палочке, вид сбоку' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-07.jpg', ratio: '3:2',
      alt: 'Девушка под зонтом на мокрой улице, на переднем плане размытый проезжающий автомобиль' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-09.jpg', ratio: '3:4',
      alt: 'Руки держат свечу в чёрной банке и крышку у окна со светлыми шторами' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-10.jpg', ratio: '3:4',
      alt: 'Печенье в разрезе: крем и ягодная начинка' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-04.jpg', ratio: '2:3',
      alt: 'Портрет молодого человека в очках и чёрной рубашке на фоне пальмовых листьев' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-14.jpg', ratio: '3:4',
      alt: 'Свечи в крафтовых тубах и ветка хлопка, вид сверху' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-04.jpg', ratio: '2:3',
      alt: 'Печенье-сэндвич на тарелке, на фоне стеклянные банки и свеча' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-09.jpg', ratio: '2:3',
      alt: 'Девушка в светлом пальто с зонтом на мокрой улице среди исторических зданий' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-04.jpg', ratio: '2:3',
      alt: 'Белая свеча в гипсовом подсвечнике на крафтовой бумаге' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-09.jpg', ratio: '3:4',
      alt: 'Печенье на тарелке, деревянный стол и стеклянная банка, вид сверху' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-13.jpg', ratio: '2:3',
      alt: 'Чёрно-белый портрет молодого человека в профиль среди листвы' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-15.jpg', ratio: '3:4',
      alt: 'Две свечи в чёрных банках, одна горит, рядом хлопок' },
    { category: 'food', type: 'photo', src: 'assets/images/food/food-06.jpg', ratio: '2:3',
      alt: 'Печенье на тарелке в мягком свете лампы' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-02.jpg', ratio: '2:3',
      alt: 'Мужчина в тёмных очках переходит улицу по пешеходному переходу' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-11.jpg', ratio: '3:4',
      alt: 'Флакон аромамасла в бумажной стружке с открыткой' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-11.jpg', ratio: '2:3',
      alt: 'Чёрно-белый портрет молодого человека в куртке на городской улице' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-02.jpg', ratio: '3:4',
      alt: 'Свеча в чёрной жестяной банке, рядом коробочка хлопка' },
    { category: 'people', type: 'photo', src: 'assets/images/people/people-08.jpg', ratio: '2:3',
      alt: 'Молодой человек в тёмных очках и чёрной куртке идёт по городской улице' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-12.jpg', ratio: '3:4',
      alt: 'Свеча в чёрной банке на ладони у окна' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-05.jpg', ratio: '3:4',
      alt: 'Открытая свеча в чёрной банке с белой этикеткой' },
    { category: 'product', type: 'photo', src: 'assets/images/product/product-16.jpg', ratio: '3:4',
      alt: 'Свеча и диффузор рядом с белым подарочным пакетом' },

    /* Видео показываются в разделе «Видео», а не в сетке фотографий. */
    {
      title: 'Интервью с собственником компании',
      type: 'video',
      src: 'assets/videos/interview.mp4',
      poster: 'assets/videos/interview-poster.jpg',
      ratio: '9:16',
      description: ''
    }
  ]
};
