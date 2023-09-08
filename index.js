// index.js

const cheerio = require("cheerio")
const axios = require("axios")

async function performScraping() {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://www.msy.com.au/",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })

    // parsing the HTML source of the target web page with Cheerio
    const $ = cheerio.load(axiosResponse.data)

    // initializing the data structures
    // that will contain the scraped data
    const itemList = [];

    // scraping the "The best customer experience in the industry" section
    $(".body-container")
        .find("li")
        .each((index, element) => {

            const name = $(element).find("span[itemprop='name']").text();
            // extracting the price of interest
            const price = $(element).find("span.goods-price").text();

            const item = {
                index: index,
                name: name,
                price: price,
            }

            // adding the object containing the scraped data
            // to the itemList array
            itemList.push(item)
        })

    // trasforming the scraped data into a general object
    const scrapedData = itemList;


    // converting the scraped data object to JSON
    const scrapedDataJSON = JSON.stringify(scrapedData)
    console.log(scrapedData)
    // storing scrapedDataJSON in a database via an API call...
}

performScraping()


