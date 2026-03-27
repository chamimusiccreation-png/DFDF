const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    // ලංකාවේ වෙලාව ගන්නවා
    const date = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Colombo"}));
    const minutes = date.getMinutes();
    const hours = date.getHours();

    // විනාඩිය අනුව 0 ඉඳන් 5 දක්වා අංකයක් හදාගන්නවා (0-9=0, 10-19=1, 20-29=2...)
    const newsIndex = Math.floor(minutes / 10);

    // බොරු නිවුස් 6ක් (විනාඩි 10න් 10ට මාරු වෙන්න)
    const fakeNewsList = [
        {
            title: "අලුත් අප්ඩේට් එක - පළමු පුවත 🚀",
            content: "මෙය පැයේ පළමු විනාඩි 10 සඳහා වන පුවතයි. බොට්ගේ ක්‍රියාකාරීත්වය සාර්ථකව ආරම්භ වී ඇත."
        },
        {
            title: "දෙවන පරීක්ෂණ පුවත - සිස්ටම් එක වැඩ ✅",
            content: "දැන් විනාඩි 10ක් ගතවී ඇත. දෙවන පුවත සාර්ථකව API එක හරහා නිකුත් විය."
        },
        {
            title: "තුන්වන පුවත - විශේෂ නිවේදනයක් ⚠️",
            content: "මෙය තුන්වන පුවතයි. Auto News පද්ධතිය කිසිදු දෝෂයකින් තොරව විනාඩි 20ක් පුරා වැඩ කරමින් පවතී."
        },
        {
            title: "හතරවන පුවත - පැයෙන් බාගයක් ඉවරයි ⏳",
            content: "පැය භාගයක් ගත වී ඇත. හතරවන පරීක්ෂණ පුවත මෙසේ නිකුත් කරමු."
        },
        {
            title: "පස්වන පුවත - තාක්ෂණික පරීක්ෂණය 🔧",
            content: "තවත් විනාඩි 10ක් ගතවිය. පස්වන පුවත සාර්ථකව ලබාගෙන ගෲප් වෙත යොමු කරමින් පවතී."
        },
        {
            title: "හයවන පුවත - පැය අවසන් වීමට ආසන්නයි 🏁",
            content: "මෙය මෙම පැයේ අවසන් පුවතයි. විනාඩි 50ක් පුරා පද්ධතිය සාර්ථකව පරීක්ෂා කරන ලදී."
        }
    ];

    // අදාළ වෙලාවට ගැළපෙන පුවත තෝරා ගැනීම
    const selectedNews = fakeNewsList[newsIndex];
    
    // පෙන්වන වෙලාව ලස්සනට හදාගන්නවා
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

    const mockNewsData = {
        "news_data": {
            "data": [
                {
                    "titleSi": selectedNews.title,
                    "cover": "https://i.ibb.co/7t5Qd3P/breaking-news.jpg",
                    "published": `2026-03-27 ${timeString}`,
                    "share_url": `https://esana.lk/test/news-${newsIndex}`, // Share URL එකත් වෙනස් වෙනවා
                    "contentSi": [
                        { "type": "text", "data": selectedNews.content },
                        { "type": "text", "data": `ජෙනරේට් කළ වේලාව: ${timeString}. ඊළඟ පුවත තවත් විනාඩි කිහිපයකින් බලාපොරොත්තු වන්න.` }
                    ],
                    "description": selectedNews.content
                }
            ]
        }
    };

    res.status(200).json(mockNewsData);
});

module.exports = app;
