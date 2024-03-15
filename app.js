    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');

    const headers = {
        "authority": "api.bseindia.com",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
        "referer": "https://www.bseindia.com/",
        "cookie": ""
    };

    async function fetchDataAndDownloadPDFs() {
        try {
            const fromDate = new Date().toISOString().split('T')[0]; // Today's date
            const toDate = fromDate;
            

            for (let currentPage = 1; currentPage <= currentPage; currentPage++) {
                const response = await axios.get(`https://api.bseindia.com/BseIndiaAPI/api/AnnSubCategoryGetData/w?pageno=${currentPage}&strCat=-1&strPrevDate=${fromDate}&strScrip=&strSearch=P&strToDate=${toDate}&strType=C&subcategory=`, { headers });
                const jsonData = response.data.Table;

                if (!Array.isArray(jsonData)) {
                    throw new Error('JSON data is not in the expected format.');
                }

                if (jsonData.length === 0) {
                    console.log(`There is not data present. Stopping the code.`);
                    break; // Stop the code if an empty page is encountered
                }

                const downloadDir = './pdfs'; // Directory to store downloaded PDFs
                if (!fs.existsSync(downloadDir)) {
                    fs.mkdirSync(downloadDir); 
                }

                for (const item of jsonData) {
                    if (item.ATTACHMENTNAME) {
                        const pdfUrl = `https://www.bseindia.com/xml-data/corpfiling/AttachLive/${item.ATTACHMENTNAME}`;
                        const pdfFileName = path.join(downloadDir, `${item.SLONGNAME}.pdf`); // Rename PDF file with SLONGNAME

                        if (fs.existsSync(pdfFileName)) {
                            console.log(`PDF already downloaded: ${pdfFileName}`);
                            continue; // Skip if PDF has already been downloaded
                        }

                        console.log(`Downloading PDF from ${pdfUrl}...`);

                        try {
                            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
                            fs.writeFileSync(pdfFileName, pdfResponse.data);
                            console.log(`PDF downloaded and saved as ${pdfFileName}`);
                        } catch (error) {
                            console.error(`Error downloading PDF from ${pdfUrl}: ${error.message}`);
                        }
                    } else {
                        console.log(`No PDF available for item: ${item.SLONGNAME}`);
                    }
                }

                console.log(`Page ${currentPage} processed.`);
            }

            console.log('All PDFs downloaded successfully.');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    fetchDataAndDownloadPDFs();
