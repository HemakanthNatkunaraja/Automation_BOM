import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Copy, Check, Play, AlertCircle, Mail } from 'lucide-react';

const GoogleSheetsTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [copiedFormula, setCopiedFormula] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  const steps = [
    {
      title: "Create New Google Sheet",
      description: "Start with a blank spreadsheet",
      action: "Go to sheets.google.com → Click '+ Blank'",
      visual: "📊 New Spreadsheet Created"
    },
    {
      title: "Set Up Headers",
      description: "Create column headers in Row 1",
      action: "Type headers in cells A1 through G1",
      visual: "Headers: Part Number | Description | Supplier | Current Price | Target Price | Last Updated | Alert"
    },
    {
      title: "Add Sample Data",
      description: "Enter test products in rows 2-4",
      action: "Fill in part numbers, descriptions, and suppliers",
      visual: "Sample data for LM358N, LM555CN, 1N4148"
    },
    {
      title: "Enter Price Formula",
      description: "Add the price calculation formula",
      action: "Click cell D2 and paste the formula",
      visual: "Formula generates random prices based on supplier"
    },
    {
      title: "Copy Formula Down",
      description: "Apply formula to all product rows",
      action: "Select D2, copy, then paste to D3:D10",
      visual: "All products now have price formulas"
    },
    {
      title: "Add Timestamp",
      description: "Track when prices were last updated",
      action: "Enter =NOW() in F2 and copy down",
      visual: "Current date/time appears in all rows"
    },
    {
      title: "Set Up Alerts",
      description: "Create alert system for price changes",
      action: "Add alert formula in G2 and copy down",
      visual: "Alert indicators show price status"
    },
    {
      title: "Enable Notifications",
      description: "Get email alerts when prices change",
      action: "Tools → Notification Rules → Set up email alerts",
      visual: "Email notifications configured"
    }
  ];

  const formulas = {
    price: `=IF(C2="digikey", RAND()*1, IF(C2="mouser", RAND()*1.2, RAND()*0.8))`,
    timestamp: `=NOW()`,
    alert: `=IF(AND(D2<>0, E2<>0, ABS(D2-E2)/E2>0.1), "🚨 ALERT!", "✅ OK")`,
    realPrice: `=IFERROR(IMPORTXML("https://example.com/search?q="&A2, "//span[@class='price']"), "Manual")`
  };

  const sampleData = [
    { part: 'LM358N', desc: 'Dual Op Amp', supplier: 'digikey', target: 0.50 },
    { part: 'LM555CN', desc: 'Timer IC', supplier: 'mouser', target: 0.75 },
    { part: '1N4148', desc: 'Switching Diode', supplier: 'octopart', target: 0.12 }
  ];

  const copyFormula = (formula, type) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(type);
    setTimeout(() => setCopiedFormula(''), 2000);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FormulaBreakdown = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">🧩 Formula Breakdown</h3>
      
      <div className="space-y-3">
        <div className="bg-white p-3 rounded border">
          <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
            =IF(C2="digikey", RAND()*1, IF(C2="mouser", RAND()*1.2, RAND()*0.8))
          </code>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="bg-green-50 p-3 rounded border border-green-200">
            <strong className="text-green-800">IF(C2="digikey")</strong>
            <p className="text-green-700">Checks if supplier is Digi-Key</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <strong className="text-yellow-800">RAND()*1</strong>
            <p className="text-yellow-700">Random price $0.00-$1.00</p>
          </div>
          <div className="bg-purple-50 p-3 rounded border border-purple-200">
            <strong className="text-purple-800">Nested IF</strong>
            <p className="text-purple-700">Different ranges per supplier</p>
          </div>
        </div>
      </div>
    </div>
  );

  const SpreadsheetPreview = () => (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-6">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <h4 className="font-semibold text-gray-800">📊 Your Spreadsheet Preview</h4>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">A</th>
              <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">B</th>
              <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">C</th>
              <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">D</th>
              <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">E</th>
              <th className="px-3 py-2 text-left font-semibold border-r border-gray-300">F</th>
              <th className="px-3 py-2 text-left font-semibold">G</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td className="px-3 py-2 border-r border-gray-300 font-semibold">Part Number</td>
              <td className="px-3 py-2 border-r border-gray-300 font-semibold">Description</td>
              <td className="px-3 py-2 border-r border-gray-300 font-semibold">Supplier</td>
              <td className="px-3 py-2 border-r border-gray-300 font-semibold">Current Price</td>
              <td className="px-3 py-2 border-r border-gray-300 font-semibold">Target Price</td>
              <td className="px-3 py-2 border-r border-gray-300 font-semibold">Last Updated</td>
              <td className="px-3 py-2 font-semibold">Alert</td>
            </tr>
            {sampleData.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-3 py-2 border-r border-gray-300">{item.part}</td>
                <td className="px-3 py-2 border-r border-gray-300">{item.desc}</td>
                <td className="px-3 py-2 border-r border-gray-300">{item.supplier}</td>
                <td className="px-3 py-2 border-r border-gray-300">${(Math.random() * 1).toFixed(2)}</td>
                <td className="px-3 py-2 border-r border-gray-300">${item.target}</td>
                <td className="px-3 py-2 border-r border-gray-300">{new Date().toLocaleDateString()}</td>
                <td className="px-3 py-2">✅ OK</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📊 Google Sheets Price Monitor Setup
          </h1>
          <p className="text-gray-600">
            Follow these steps to create your own automated price monitoring system
          </p>
        </div>

        {/* Formula Breakdown */}
        <FormulaBreakdown />

        {/* Spreadsheet Preview */}
        <SpreadsheetPreview />

        {/* Step-by-Step Tutorial */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6">🚀 Step-by-Step Setup</h2>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                currentStep === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setCurrentStep(currentStep === index ? -1 : index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                      currentStep === index ? 'bg-blue-600' : 'bg-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  {currentStep === index ? <ChevronDown /> : <ChevronRight />}
                </div>
                
                {currentStep === index && (
                  <div className="mt-4 pl-11">
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <div className="bg-white p-3 rounded border">
                      <strong>Action:</strong> {step.action}
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200 mt-2">
                      <strong>Result:</strong> {step.visual}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formulas Reference */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6">📝 Formula Reference</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">💰 Demo Price Formula</h3>
              <div className="bg-gray-50 p-3 rounded mb-2">
                <code className="text-sm break-all">{formulas.price}</code>
              </div>
              <button
                onClick={() => copyFormula(formulas.price, 'price')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                {copiedFormula === 'price' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedFormula === 'price' ? 'Copied!' : 'Copy Formula'}</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">📅 Timestamp Formula</h3>
              <div className="bg-gray-50 p-3 rounded mb-2">
                <code className="text-sm">{formulas.timestamp}</code>
              </div>
              <button
                onClick={() => copyFormula(formulas.timestamp, 'timestamp')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                {copiedFormula === 'timestamp' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedFormula === 'timestamp' ? 'Copied!' : 'Copy Formula'}</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">🚨 Alert Formula</h3>
              <div className="bg-gray-50 p-3 rounded mb-2">
                <code className="text-sm break-all">{formulas.alert}</code>
              </div>
              <button
                onClick={() => copyFormula(formulas.alert, 'alert')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                {copiedFormula === 'alert' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedFormula === 'alert' ? 'Copied!' : 'Copy Formula'}</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">🌐 Real Price Formula</h3>
              <div className="bg-gray-50 p-3 rounded mb-2">
                <code className="text-sm break-all">{formulas.realPrice}</code>
              </div>
              <button
                onClick={() => copyFormula(formulas.realPrice, 'realPrice')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                {copiedFormula === 'realPrice' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedFormula === 'realPrice' ? 'Copied!' : 'Copy Formula'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">🔧 Advanced Features</h2>
          
          <div className="space-y-4">
            <div 
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection('notifications')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Email Notifications</h3>
                </div>
                {expandedSections.notifications ? <ChevronDown /> : <ChevronRight />}
              </div>
              
              {expandedSections.notifications && (
                <div className="mt-4 pl-8">
                  <p className="text-gray-600 mb-2">Set up automatic email alerts:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                    <li>Go to <strong>Tools → Notification Rules</strong></li>
                    <li>Click <strong>"Add notification rule"</strong></li>
                    <li>Select <strong>"Any changes are made"</strong></li>
                    <li>Choose frequency: <strong>"Right away"</strong></li>
                    <li>Enter your email address</li>
                    <li>Click <strong>"Save"</strong></li>
                  </ol>
                </div>
              )}
            </div>

            <div 
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection('automation')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">Automatic Updates</h3>
                </div>
                {expandedSections.automation ? <ChevronDown /> : <ChevronRight />}
              </div>
              
              {expandedSections.automation && (
                <div className="mt-4 pl-8">
                  <p className="text-gray-600 mb-2">Set up automatic price updates:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                    <li>Go to <strong>Extensions → Apps Script</strong></li>
                    <li>Delete default code and paste the automation script</li>
                    <li>Save and authorize the script</li>
                    <li>Set up time-based trigger for hourly updates</li>
                    <li>Prices will update automatically!</li>
                  </ol>
                </div>
              )}
            </div>

            <div 
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection('tips')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold">Pro Tips</h3>
                </div>
                {expandedSections.tips ? <ChevronDown /> : <ChevronRight />}
              </div>
              
              {expandedSections.tips && (
                <div className="mt-4 pl-8">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>Use data validation</strong> to ensure consistent supplier names</li>
                    <li>• <strong>Add conditional formatting</strong> to highlight price alerts</li>
                    <li>• <strong>Create a separate history sheet</strong> to track price changes over time</li>
                    <li>• <strong>Use IMPORTXML cautiously</strong> - some sites block automated requests</li>
                    <li>• <strong>Share with your team</strong> for collaborative monitoring</li>
                    <li>• <strong>Mobile app</strong> lets you check prices on the go</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Start Button */}
        <div className="mt-6 text-center">
          <a
            href="https://sheets.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Building Your Price Monitor
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsTutorial;
                