<?$dataFromPHP["Title"]="Churn Prediction Project: BCG.X & PowerCo"; $dataFromPHP["Description"]="As part of a BCG.X Data Science Team project, in collaboration with PowerCo, a prominent player in the utilities sector, our mission was to predict customer churn in the gas and electricity industry using advanced machine learning models."; $dataFromPHP["Creation"]="31 October 2023"; $dataFromPHP["Author"]="Manuel Ardizio"; $dataFromPHP["LectureTime"]="13 min";?>
<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t4-p1-PowerCo.webp;dark:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t4-p1-PowerCo.webp)"></div>
<div class="Text" data-SwiftUI=".fontExtension(weight:4;size:2).foregroundColor(2).lineSpacing(1.25).customPosition(pad:48,12,36)">Data Science at BCG.X</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)"> I have been assigned as a data scientist to a project with PowerCo, a prominent client in the utilities sector, focusing on gas and electricity services.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">Key areas of concern within this industry encompass:</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Limited product differentiation.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Prioritizing customer service.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Retaining customers over the long term.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Cultivating brand loyalty.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">My primary task is to investigate the factors influencing PowerCo's customers to switch to another service provider, a phenomenon commonly referred to as "customer churn".</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">A crucial task of a data scientist is to understand the business problem at hand and lay out an approach to address it.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">T1 is designed to gain a better understanding of the problem our client is facing, and translate the business problem into a data science one.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">PowerCo is a major gas and electricity utility that supplies to corporate, SME (Small & Medium Enterprise), and residential customers. The power-liberalization of the energy market in Europe has led to significant customer churn, especially in the SME segment. </div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)"><span class="t-italic">HP_1</span>: <span class="t-bold">is that price changes affect customer churn</span>. Therefore, it is helpful to know which customers are more (or less) likely to churn at their current price, for which a good predictive model could be useful.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)"><span class="t-italic">SOLUTION1</span>: Moreover, for those customers who are at risk of churning, a discount might incentivize them to stay with our client.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">The head of the SME division is <span class="t-bold">considering a 20% discount</span> that is considered large enough to dissuade almost anyone from churning (especially those for whom price is the primary concern).</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:3).foregroundColor(2).customPosition(pad:12,12,20)">Task 1 - Business Understanding & Hypothesis Framing</div>
<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t1-PowerCo.webp;dark:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t1-PowerCo.webp;alt:Internal mail to Associate Director)"></div>
<div class="Text t-center" data-SwiftUI=".fontExtension(weight:3;size:7).foregroundColor(3).customPosition(pad:8,12,16)">Fig. 1. Internal mail to Associate Director</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:3).foregroundColor(2).customPosition(pad:12,12,20)">Task 2 </div>
<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:4).foregroundColor(2).customPosition(pad:12,12,16)">Exploratory Data Analysis</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">We received from the customers two datasets. In the following documents you can read a brief EDA.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">You can go deeper exploring the <a data-SwiftUI=".onTapGesture(perform:RouteExternal_github.com/ardizio/BCG-X-x-Forage-Data-Science-Job-Simulation/blob/main/T2-p1-EDA.ipynb)">EDA .ipynb</a> file.</div>

<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p5-PowerCo.webp;dark:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p5-PowerCo.webp)"></div>
<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p6-PowerCo.webp;dark:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p6-PowerCo.webp)"></div>
<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:4).foregroundColor(2).customPosition(pad:12,12,16)">Feature Extraction and Hypothesis testing.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">The second part of my task involved merging the client data with historical monthly prices, aimed at testing Hypothesis 1 (HP_1): whether price increases are a key factor in customer churn.</div>

<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p1-PowerCo.webp;dark:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p1-PowerCo.webp;alt:Data manipulation)"></div>
<div class="Text t-center" data-SwiftUI=".fontExtension(weight:3;size:7).foregroundColor(3).customPosition(pad:8,12,16)">Fig. 2. Data manipulation</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">This has been the most captivating aspect of the project. I initially had 14,000 client rows and 190,000 data rows to process.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">To tackle this, I first developed an algorithm that could process one row per minute, which was too slow for the scale of the task. Subsequently, I created a more efficient algorithm that took approximately 3 hours to iterate through the 14,000 rows. To further expedite the process, I decided to implement <span class="t-code">multithreading</span>. I even considered using a cluster of machines to further reduce processing time. Eventually, I was able to run my improved algorithm on a machine with 8 cores, completing the task in just 16 minutes.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">I recommend taking a look at the <a data-SwiftUI=".onTapGesture(perform:RouteExternal_github.com/ardizio/BCG-X-x-Forage-Data-Science-Job-Simulation/blob/main/T2-p2-extraction.ipynb)">extraction .ipynb</a> in my GitHub repository for more details.</div>

<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p2-PowerCo.webp;dark:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p2-PowerCo.webp)"></div>
<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p3-PowerCo.webp;dark:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p3-PowerCo.webp;alt:Data Transformation and Data Analysis - Part1)"></div>
<div class="Text t-center" data-SwiftUI=".fontExtension(weight:3;size:7).foregroundColor(3).customPosition(pad:8,12,16)">Fig. 3. Data Transformation and Data Analysis - Part1</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)"><span class="t-bold">Statistical Analysis</span></div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">In order to perform an Analysis of Variance <span class="t-italic">ANOVA</span> and investigate whether the average variable <span class="t-code">AVG_VARIABLE</span> and average fixed <span class="t-code">AVG_FIXED</span> prices over the last 6 months, along with their percentage changes <span class="t-code">PCTG_AVG_VARIABLE</span> and <span class="t-code">PCTG_AVG_FIXED</span>, have increased or decreased, I transformed these continuous values into fixed classes.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">For a comprehensive understanding of the data transformation and the analysis tests, I recommend reviewing the <a data-SwiftUI=".onTapGesture(perform:RouteExternal_github.com/ardizio/BCG-X-x-Forage-Data-Science-Job-Simulation/blob/main/T2-p3-HypTest.ipynb)">HypTest.ipynb</a>.</div>

<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p4-PowerCo.webp;dark:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t2-p4-PowerCo.webp;alt:Analysis of Variance Test and Results)"></div>
<div class="Text t-center" data-SwiftUI=".fontExtension(weight:3;size:7).foregroundColor(3).customPosition(pad:8,12,16)">Fig. 4. Analysis of Variance Test and Results</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">The statistical findings indicate that an increase in <span class="t-code">AVG_VARIABLE</span> and <span class="t-code">AVG_FIXED</span> <span class="t-italic">prices has a direct impact on customer churn</span>.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)"><span class="t-code">PCTG_AVG_VARIABLE</span> and <span class="t-code">PCTG_AVG_FIXED</span> <span class="t-italic">do not demonstrate strong evidence of such an effect</span>.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:3).foregroundColor(2).customPosition(pad:12,12,20)">Task 3 - Feature Engineering & Modeling</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">The most critical file, titled <a data-SwiftUI=".onTapGesture(perform:RouteExternal_github.com/ardizio/BCG-X-x-Forage-Data-Science-Job-Simulation/blob/main/T3-RandomForestClassifier-tuned.ipynb)">Feature Engineering and ML Models</a>, plays a pivotal role in our project. In this notebook, I've built a comprehensive pipeline that begins with the original dataset provided by PowerCo in Task 2.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">At the request of BCG.X, I've applied a RandomForest model for binary classification and further fine-tuned it using GridSearchCV.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:4).foregroundColor(2).customPosition(pad:12,12,16)">Final results:</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">In the initial model:</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Accuracy is 0.8983, which means 89.83% of the predictions were correct.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Precision is 0.6897, indicating that out of all positive predictions, 68.97% were true positives.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Recall is 0.0649, suggesting that the model correctly identified only 6.49% of actual positive cases.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- F1-Score is 0.1187, which balances precision and recall into a single metric.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">In the tuned model:</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Accuracy improved slightly to 0.8990, indicating a 0.10% increase in correct predictions.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Precision increased significantly to 0.7826, which means the model improved in correctly identifying true positives among positive predictions.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- Recall slightly decreased to 0.0584, indicating that the model still struggles to capture actual positive cases.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">- F1-Score is 0.1088, showing that the balance between precision and recall remains similar.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">In both models, the recall is quite low, which means they have difficulty identifying actual positive cases.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">The precision improved in the tuned model, indicating a better positive prediction accuracy. </div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">However, the overall performance still leaves room for improvement.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">To further improve the model, I may consider exploring different classification algorithms, feature engineering, collecting more data, or addressing class imbalance.</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)"> </div>
<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:3).foregroundColor(2).customPosition(pad:12,12,20)">Task 4 - Findings & Recommendations</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">This is the concluding slide I presented to the Head of the SME division, SME Customer Relationship Manager, and Head of Analytics. You can find a summary of my findings in the following image.</div>

<div class="Image ScaledToFit" style="background-color: #000000;" data-SwiftUI=".Image(light:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t4-p2-PowerCo.webp;dark:www.actum.it/app/lib/dataLayer/DataBin/bcgx-t4-p2-PowerCo.webp;alt:Executive Summary)"></div>
<div class="Text t-center" data-SwiftUI=".fontExtension(weight:3;size:7).foregroundColor(3).customPosition(pad:8,12,16)">Fig. 5. Executive Summary</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:3).foregroundColor(2).customPosition(pad:12,12,20)">Reflections on the Job Simulation</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">This job simulation has indeed been quite labor-intensive. The exploratory data analysis (EDA) and feature engineering phase of the project proved to be particularly in-depth. The company tasked me with generating and examining new features to validate our hypotheses.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">So, what have I learned from this experience? I've realized that the model-building stage of a project is secondary. To achieve better predictive accuracy, the critical aspect is having the right features, ideally with equal distribution.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">Looking ahead, it might be worthwhile to explore ways to automate the dataset preprocessing process, reducing the time spent on data manipulation and automating tests.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)">The Python community lacks a comprehensive experiment tracking system. To address this gap, we could develop a solution that incorporates a REST API to record experiment data to a database. This system could also feature a user-friendly dashboard for visualization and result analysis. Alternatively, it could offer the option to save experiment results locally to a .txt file.</div>

<div class="Text" data-SwiftUI=".fontExtension(weight:3;size:3).foregroundColor(2).customPosition(pad:12,12,20)">Code and Datasets:</div>
<div class="Text" data-SwiftUI=".fontExtension(weight:2;size:4).foregroundColor(3).customPosition(pad:0,12,16)"><a data-SwiftUI=".onTapGesture(perform:RouteExternal_github.com/ardizio/BCG-X-x-Forage-Data-Science-Job-Simulation)">BCG-X-x-Forage-Data-Science-Job-Simulation</a></div>
