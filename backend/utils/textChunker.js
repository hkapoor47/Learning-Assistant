/**
 * @param {string} text 
 * @param {number} chunkSize
 * @param {number} overLap
 * @returns {Array<{content:string , chunkIndex:number , pageNumber:number}>}
 */

export const chunkText =(text, chunkSize=500 , overlap=50)=>{
    if(!text  || text.trim().length===0){
        return [];
    }

    const cleanedText =text
       .replace(/\r\n/g, '\n')
       .replace(/\s+/g, ' ')
       .replace(/\n /g, '\n')
       .replace(/ \n/g, '/\n')
       .trim();

       const paragraphs = cleanedText.split(/\n+/).filter(p => p.trim().length >0);

       const chunks =[];
       let currentChunk =[];
       let currentWordCount =0;
       let chunkIndex =0;

       for(const paragraph of paragraphs){
        const paragraphsWords = paragraph.trim().split(/\s+/);
        const paragraphWordCount = paragraphsWords.length;

       if(paragraphWordCount>chunkSize){
        if(currentChunk.length>0){
            chunks.push({
                content:currentChunk.join('\n\n'),
                chunkIndex: chunkIndex++,
                pageNumber:0
            });
            currentChunk =[];
            currentWordCount=0;
        }

        for(let i= 0; i<paragraphsWords.length;i+=(chunkSize-overlap)){
            const chunkWords = paragraphsWords.slice(i,i+chunkSize);
            chunks.push({
                content:chunkWords.join(' '),
                chunkIndex : chunkIndex++,
                pageNumber:0
            });
            if(i+chunkSize>=paragraphsWords.length){
                break;
            }
        }
        continue;
       }

       if(currentWordCount +paragraphWordCount > chunkSize && currentChunk.length>0){
        chunks.push({
            content:currentChunk.join('\n\n'),
            chunkIndex: chunkIndex++,
            pageNumber:0
        });
        const prevChunkText = currentChunk.join(' ');
        const prevWords = prevChunkText.split(/\s+/);
        const overlapText = preWords.slice(-Math.min(overlap, prevWords.length)).join(' ');

        currentChunk =[overlapText , paragraph.trim()];
        currentWordCount = overlapText.split(/\s+/).length + paragraphWordCount;
       }else{
        currentChunk.push(paragraph.trim());
        currentWordCount += paragraphWordCount;
       }
    }
       
      if(currentChunk.lenth >0){
        chunks.push({
            content: currentChunks.join('\n\n'),
            chunkIndex: chunkIndex++,
            pageNumber:0
        });
      }
       
      if(chunks.length ===0 && cleanedText.length>0){
        const allwords = cleanedText.split(/\s+/);
        for(let i=0; i<allwords.length;i+=(chunkSize-overlap)){
            const chunkWords = allwords.slice(i,i+chunkSize);
            chunks.push({
                content:chunkWords.join(' '),
                chunkIndex: chunkIndex++,
                pageNumber:0
            });
            if(i+chunkSize>=allwords.length){
                break;
            }
        }
    }

    return chunks;
};

/**
 * @param {Array<Object>} chunks
 * @param {string} query
 * @param {number} maxChunks
 * @returns {Array<Object>}
*/

export const findRelevantChunks =(chunks, query, maxChunks=3)=>{
    if(!chunks || chunks.length===0 || !query || query.trim().length===0){
        return [];
    }

    const stopWords = new Set([
        'the', 'is', 'at', 'which', 'on', 'a', 'an' , 'and', 'or','but',
        'in','with','to','of','for','by','from','as','that','this','these','those','it','its','be','are','was','were','has','have','had'
    ]);

    const queryWords = query.toLowerCase().split(/\s+/).filter(w =>w.length>2 && !stopWords.has(w));

    if(queryWords.length ===0){
        return chunks.slice(0, maxChunks).map(chunk =>({
            content: chunk.content,
            chunkIndex: chunk.chunkIndex,
            pageaNumber: chunk.pageNumber,
            _id: chunk._id
        }));
    }

    const scoredChunks = chunks.map((chunk, index)=>{
        const content = chunk.content.toLowerCase();
        const score =0;

        for(const word of queryWords){
            const exactMatches =(content.match(new RegExp(`\\b${word}\\b`, 'g')) || []).length;
            score += exactMatches * 3;
            
            const partialMatches = (content.match(new RegExp(word, 'g')) || []).length;
            score += Math.max(0, partialMatches - exactMatches)*1.5;
        }
        const uniqueWordsFound = queryWords.filter(word => content.includes(word)).length;
        if(uniqueWordsFound >0){
            score += uniqueWordsFound *2;
        }

        const normalizedScore = score / Math.sqrt(contentWords);

        const positionsBonus = 1 - (index / chunks.length) *0.1;

        return{
            content: chunk.content,
            chunkIndex: chunk.chunkIndex,
            pageNumber: chunk.pageNumber,
            _id: chunk._id,
            score: normalizedScore * positionsBonus,
            rawScore: score,
            matchedWords: uniqueWordsFound
        };

    });

    return scoredChunks
    .filter(chunk => chunk.score >0)
    .sort((a,b)=>{
        if(b.score !== a.score){
            return b.score - a.score;
        }
        if(b.matchedWords !== a.matchedWords){
            return b.matchedWords - a.matchedWords;
        }
        return a.chunkIndex - b.chunkIndex;
    })
    .slice(0, maxChunks);
}