"use strict";

class PrintMachine {
  constructor(fontSize, color, fontFamily) {
    this.fontSize = fontSize;
    this.color = color;
    this.fontFamily = fontFamily;
  }

  print(text) {
    document.write(
      `<p style="font-size: ${this.fontSize}; color: ${this.color}; font-family: ${this.fontFamily};">${text}</p>`,
    );
  }
}

class News {
  constructor(title, text, tags, date) {
    this.title = title;
    this.text = text;
    this.tags = tags;
    this.date = date;
  }

  getDateText() {
    const now = new Date();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor((now - this.date) / millisecondsInDay);

    if (daysPassed < 1) {
      return "сьогодні";
    }

    if (daysPassed < 7) {
      return `${daysPassed} днів тому`;
    }

    return this.date.toLocaleDateString("uk-UA");
  }

  print() {
    const tagsText = this.tags.map((tag) => `#${tag}`).join(" ");

    document.write(`
      <article>
        <h2>${this.title}</h2>
        <p>${this.getDateText()}</p>
        <p>${this.text}</p>
        <p>${tagsText}</p>
      </article>
    `);
  }
}

class NewsFeed {
  constructor(newsList) {
    this.newsList = newsList;
  }

  get count() {
    return this.newsList.length;
  }

  printAllNews() {
    for (const news of this.newsList) {
      news.print();
    }
  }

  addNews(news) {
    this.newsList.push(news);
  }

  removeNews(title) {
    this.newsList = this.newsList.filter((news) => news.title !== title);
  }

  sortByDate() {
    this.newsList.sort(
      (firstNews, secondNews) => secondNews.date - firstNews.date,
    );
  }

  searchByTag(tag) {
    return this.newsList.filter((news) => news.tags.includes(tag));
  }
}

document.write(`
  <style>
    body {
      max-width: 900px;
      margin: 30px auto;
      font-family: Arial, sans-serif;
      font-size: 20px;
      line-height: 1.5;
    }

    article {
      margin-bottom: 35px;
    }

    h2 {
      font-size: 36px;
    }
  </style>
`);

document.write("<h2>Завдання 1</h2>");
const printMachine = new PrintMachine("24px", "blue", "Georgia");
printMachine.print("Текст надрукований за допомогою PrintMachine.");

const today = new Date();

const twoDaysAgo = new Date();
twoDaysAgo.setDate(today.getDate() - 2);

const tenDaysAgo = new Date();
tenDaysAgo.setDate(today.getDate() - 10);

const firstNews = new News(
  "What is Lorem Ipsum?",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  ["lorem", "ipsum", "text"],
  twoDaysAgo,
);

const secondNews = new News(
  "JavaScript Classes",
  "Класи допомагають створювати об'єкти з однаковими властивостями та методами.",
  ["javascript", "oop", "classes"],
  today,
);

const thirdNews = new News(
  "Old Programming News",
  "Ця новина показує повну дату, тому що вона була опублікована більше тижня тому.",
  ["javascript", "history"],
  tenDaysAgo,
);

document.write("<h2>Завдання 2</h2>");
firstNews.print();

document.write("<h2>Завдання 3</h2>");
const newsFeed = new NewsFeed([firstNews, secondNews]);

document.write(`<p>Кількість новин: ${newsFeed.count}</p>`);

newsFeed.addNews(thirdNews);
document.write(`<p>Після додавання новини: ${newsFeed.count}</p>`);

newsFeed.removeNews("What is Lorem Ipsum?");
document.write(`<p>Після видалення новини: ${newsFeed.count}</p>`);

newsFeed.sortByDate();
document.write("<h2>Усі новини після сортування</h2>");
newsFeed.printAllNews();

const javascriptNews = newsFeed.searchByTag("javascript");
document.write("<h2>Пошук за тегом #javascript</h2>");

for (const news of javascriptNews) {
  news.print();
}
