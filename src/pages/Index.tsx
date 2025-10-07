import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PCOSVisualizer from '@/components/PCOSVisualizer';
import { usePCOSType, getPCOSTypeLabel, PCOSMetrics } from '@/hooks/usePCOSType';

const Index = () => {
  const [metrics, setMetrics] = useState<PCOSMetrics>({
    androgenExcess: 0,
    polycysticOvaries: 0,
    ovulatoryDysfunction: 0,
  });

  const pcosType = usePCOSType(metrics);
  const typeLabel = getPCOSTypeLabel(pcosType);

  // Preset configurations
  const presets = {
    unclear: { androgenExcess: 0, polycysticOvaries: 0, ovulatoryDysfunction: 0 },
    typeA: { androgenExcess: 8, polycysticOvaries: 8, ovulatoryDysfunction: 8 },
    typeB: { androgenExcess: 8, polycysticOvaries: 2, ovulatoryDysfunction: 8 },
    typeC: { androgenExcess: 8, polycysticOvaries: 8, ovulatoryDysfunction: 2 },
    typeD: { androgenExcess: 2, polycysticOvaries: 8, ovulatoryDysfunction: 8 },
    reproductive: { androgenExcess: 5, polycysticOvaries: 5, ovulatoryDysfunction: 9 },
    metabolic: { androgenExcess: 9, polycysticOvaries: 5, ovulatoryDysfunction: 5 },
    mixed: { androgenExcess: 7, polycysticOvaries: 7, ovulatoryDysfunction: 7 },
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            PCOS Phenotype Visualizer
          </h1>
          <p className="text-muted-foreground text-lg">
            Interactive demo for development team
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Visualization */}
          <Card className="p-8 bg-card border-2 border-primary/20 shadow-lg shadow-primary/5">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Your PCOS Phenotype</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Based on self-reported symptom data
              </p>
              <div className="p-4 rounded-2xl bg-primary/10 border-2 border-primary/30">
                <p className="font-semibold text-primary">{typeLabel}</p>
              </div>
            </div>
            
            <PCOSVisualizer metrics={metrics} type={pcosType} />
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-2 border-primary/20 shadow-lg shadow-primary/5">
              <h3 className="text-xl font-semibold mb-4">Adjust Metrics</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Move sliders to see how the visualization changes
              </p>
              
              <div className="space-y-6">
                {/* Androgen Excess */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Androgen Excess (AE)</label>
                    <span className="text-sm font-semibold text-primary">{metrics.androgenExcess}</span>
                  </div>
                  <Slider
                    value={[metrics.androgenExcess]}
                    onValueChange={(value) => setMetrics({ ...metrics, androgenExcess: value[0] })}
                    min={0}
                    max={10}
                    step={1}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>None</span>
                    <span>Low (1-3)</span>
                    <span>Med (4-6)</span>
                    <span>High (7-10)</span>
                  </div>
                </div>

                {/* Polycystic Ovaries */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Polycystic Ovaries (PCO)</label>
                    <span className="text-sm font-semibold text-primary">{metrics.polycysticOvaries}</span>
                  </div>
                  <Slider
                    value={[metrics.polycysticOvaries]}
                    onValueChange={(value) => setMetrics({ ...metrics, polycysticOvaries: value[0] })}
                    min={0}
                    max={10}
                    step={1}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>None</span>
                    <span>Low (1-3)</span>
                    <span>Med (4-6)</span>
                    <span>High (7-10)</span>
                  </div>
                </div>

                {/* Ovulatory Dysfunction */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Ovulatory Dysfunction (OD)</label>
                    <span className="text-sm font-semibold text-primary">{metrics.ovulatoryDysfunction}</span>
                  </div>
                  <Slider
                    value={[metrics.ovulatoryDysfunction]}
                    onValueChange={(value) => setMetrics({ ...metrics, ovulatoryDysfunction: value[0] })}
                    min={0}
                    max={10}
                    step={1}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>None</span>
                    <span>Low (1-3)</span>
                    <span>Med (4-6)</span>
                    <span>High (7-10)</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-2 border-primary/20 shadow-lg shadow-primary/5">
              <h3 className="text-xl font-semibold mb-4">Preset Examples</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Click to load example phenotypes
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setMetrics(presets.unclear)} className="text-xs">
                  Unclear
                </Button>
                <Button variant="outline" onClick={() => setMetrics(presets.typeA)} className="text-xs">
                  Type A
                </Button>
                <Button variant="outline" onClick={() => setMetrics(presets.typeB)} className="text-xs">
                  Type B
                </Button>
                <Button variant="outline" onClick={() => setMetrics(presets.typeC)} className="text-xs">
                  Type C
                </Button>
                <Button variant="outline" onClick={() => setMetrics(presets.typeD)} className="text-xs">
                  Type D
                </Button>
                <Button variant="outline" onClick={() => setMetrics(presets.reproductive)} className="text-xs">
                  Reproductive
                </Button>
                <Button variant="outline" onClick={() => setMetrics(presets.metabolic)} className="text-xs">
                  Metabolic
                </Button>
                <Button variant="outline" onClick={() => setMetrics(presets.mixed)} className="text-xs">
                  Mixed
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6 bg-card border-2 border-primary/20 shadow-lg shadow-primary/5">
          <h3 className="text-lg font-semibold mb-3">How It Works</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Three rings:</strong> Increasing color transparency shows intensity levels (light to dark)</li>
            <li>• <strong>Blob shape:</strong> Organic liquid glass aesthetic that dynamically adjusts based on metrics</li>
            <li>• <strong>Spring animation:</strong> Smooth, elastic transitions when values change</li>
            <li>• <strong>Question mark:</strong> Displayed when all values are 0 (insufficient data)</li>
            <li>• <strong>Type calculation:</strong> Automatically determines PCOS type based on Rotterdam criteria</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Index;
