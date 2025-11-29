import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { PhenotypeResult } from '@/types/questionnaire';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface PhenotypeResultsProps {
  result: PhenotypeResult;
}

const PhenotypeResults = ({ result }: PhenotypeResultsProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getTypeContent = () => {
    switch (result.type) {
      case 'type-a':
        return {
          title: 'What is Type A?',
          description: 'Individuals with Type A PCOS exhibit all three of the core features of PCOS: androgen excess (AE); ovulatory dysfunction (OD) and polycystic ovaries (PCO).',
          prevalence: 'Type A is the most common type, representing about 70% of individuals with PCOS.',
          assessment: 'Based on your self-reported information, you appear to share similar symptoms with individuals who have Type A PCOS.',
          acronyms: ['ae', 'od', 'pco']
        };
      case 'type-b':
        return {
          title: 'What is Type B?',
          description: 'Individuals with Type B PCOS exhibit two of the three core features of PCOS: androgen excess (AE) and ovulatory dysfunction (OD).',
          prevalence: 'Type B is a less common type, representing about 10% of individuals with PCOS.',
          assessment: 'Based on your self-reported information, you appear to share similar symptoms with individuals who have Type B PCOS.',
          acronyms: ['ae', 'od']
        };
      case 'type-c':
        return {
          title: 'What is Type C?',
          description: 'Individuals with Type C PCOS exhibit two of the three core features of PCOS: androgen excess (AE) and polycystic ovaries (PCO).',
          prevalence: 'Type C is the second most common type, representing about 20% of individuals with PCOS.',
          assessment: 'Based on your self-reported information, you appear to share similar symptoms with individuals who have Type C PCOS.',
          acronyms: ['ae', 'pco']
        };
      case 'type-d':
        return {
          title: 'What is Type D?',
          description: 'Individuals with Type D PCOS exhibit two of the three core features of PCOS: ovulatory dysfunction (OD) and polycystic ovaries (PCO).',
          prevalence: 'Type D is a less common type, representing about 5% of individuals with PCOS.',
          assessment: 'Based on your self-reported information, you appear to share similar symptoms with individuals who have Type D PCOS.',
          acronyms: ['od', 'pco']
        };
      default:
        return null;
    }
  };

  const getSubtypeContent = () => {
    switch (result.subtype) {
      case 'reproductive':
        return {
          title: 'What is Reproductive Type?',
          description: 'Individuals with Reproductive Type PCOS exhibit a subset of the core features associated with PCOS: androgen excess (AE); high levels of luteinizing hormone (LH) and high levels of sex-hormone binding globulin (SHBG).',
          prevalence: 'Reproductive Type is a less common type, representing about 20% of individuals with PCOS.',
          assessment: 'Based on your self-reported information, you appear to share similar symptoms with individuals who have Reproductive Type PCOS.',
          acronyms: ['lh', 'shbg']
        };
      case 'metabolic':
        return {
          title: 'What is Metabolic Type?',
          description: 'Individuals with Metabolic Type PCOS exhibit many of the core features associated with PCOS: androgen excess (AE); high body mass index (BMI); high circulating glucose (or hyperglycemia) and high insulin levels (or hyperinsulinemia).',
          prevalence: 'Metabolic Type is a common type, representing about 40% of individuals with PCOS.',
          assessment: 'Based on your self-reported information, you appear to share similar symptoms with individuals who have Metabolic Type PCOS.',
          acronyms: ['glucose', 'insulin']
        };
      case 'mixed':
        return {
          title: 'What is Mixed Type?',
          description: 'Individuals with Mixed Type PCOS do not fit within the typical characteristics of either the Metabolic or Reproductive Type.',
          prevalence: 'Mixed Type is a common type, representing about 40% of individuals with PCOS.',
          assessment: 'Based on your self-reported information, you appear to share similar symptoms with individuals who have Mixed Type PCOS.',
          acronyms: []
        };
      default:
        return null;
    }
  };

  const getAcronymDefinitions = () => {
    return {
      ae: {
        title: 'What is AE?',
        content: 'AE stands for androgen excess (also known as hyperandrogenism), a condition where the body produces too much androgen due to abnormal functioning of the HPO axis.'
      },
      od: {
        title: 'What is OD?',
        content: 'OD stands for ovulatory dysfunction, a condition where there is a failure to ovulate on a regular monthly cycle.'
      },
      pco: {
        title: 'What is PCO?',
        content: 'PCO stands for polycystic ovaries, a condition where multiple immature follicles build up on the ovaries.'
      },
      lh: {
        title: 'What is LH?',
        content: 'LH stands for luteinizing hormone, a chemical messenger produced by the pituitary gland at the base of the brain, and responsible for helping your ovaries mature and function (alongside follicle-stimulating hormone).'
      },
      shbg: {
        title: 'What is SHBG?',
        content: 'SHBG stands for sex hormone binding globulin, a protein that helps controls the amount of "free" sex hormones such as androgens that are active in the body by binding to those hormones in the blood.'
      },
      glucose: {
        title: 'What is Circulating Glucose?',
        content: 'Circulating Glucose is a measure of the level of glucose (sugar) in your bloodstream with levels greater than 125 milligrams per deciliter (mg/dL), classified as hyperglycemia (high blood sugar).'
      },
      insulin: {
        title: 'What is Insulin?',
        content: 'Insulin is a hormone or "chemical messenger" produced by the pancreas that regulates the metabolism of sugar, fats and protein.'
      }
    };
  };

  const typeContent = getTypeContent();
  const subtypeContent = getSubtypeContent();
  const acronyms = getAcronymDefinitions();

  if (result.type === 'unclear' && result.subtype === 'unclear') {
    return (
      <div className="space-y-3 mt-4">
        <h2 className="text-xl font-semibold text-foreground">Your Results:</h2>
        <p className="text-sm text-foreground">Keep answering questions to determine your PCOS type</p>
        
        <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-lg">
          <CardContent className="p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="why-no-phenotype" className="border-none">
                <AccordionTrigger className="text-sm font-medium text-primary hover:no-underline py-1 text-left">
                  Why can't I see a Phenotype?
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Our phenotype calculator currently relies only on the information you have provided in the Advanced Setup.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If the information you provided was not sufficient to make a determination, no Phenotype information will be displayed.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If you have not completed those questions you can go back at any time and fill them in.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We will continue to refine our algorithm and integrate information from your journalling in future.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Core PCOS Features Acronyms */}
        <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-lg">
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Core PCOS Features</h3>
            <p className="text-sm text-muted-foreground">
              PCOS is typically characterized by three core features: AE, OD, and PCO.
            </p>
            
            <div className="space-y-2">
              {['ae', 'od', 'pco'].map((acronym) => (
                <Collapsible 
                  key={acronym} 
                  open={openSections[acronym]} 
                  onOpenChange={() => toggleSection(acronym)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-border/40 bg-background/20 hover:bg-background/40 hover:border-primary/30 transition-all duration-200">
                    <span className="text-sm font-medium text-foreground">
                      {acronyms[acronym as keyof typeof acronyms].title}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSections[acronym] ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2 px-3">
                    <p className="text-sm text-muted-foreground">
                      {acronyms[acronym as keyof typeof acronyms].content}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTypeName = () => {
    switch (result.type) {
      case 'type-a': return 'Type A';
      case 'type-b': return 'Type B';
      case 'type-c': return 'Type C';
      case 'type-d': return 'Type D';
      default: return '';
    }
  };

  const getSubtypeName = () => {
    switch (result.subtype) {
      case 'reproductive': return 'Reproductive Type';
      case 'metabolic': return 'Metabolic Type';
      case 'mixed': return 'Mixed Type';
      default: return '';
    }
  };

  return (
    <div className="space-y-3 mt-4">
      <h2 className="text-xl font-semibold text-foreground">Your Results:</h2>

      {/* Container 1: Four Cluster Model */}
      {typeContent && (
        <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-lg">
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Four Cluster Model</h3>
            <p className="text-sm text-foreground">
              Based on your self-reported information, you appear to share similar symptoms with individuals who have <span className="font-semibold italic">{getTypeName()} PCOS</span>.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="type-details" className="border-none">
                <AccordionTrigger className="text-sm font-medium text-primary hover:no-underline py-2 text-left">
                  {typeContent.title}
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{typeContent.description}</p>
                  <p className="text-sm text-muted-foreground">{typeContent.prevalence}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Acronym definitions for this type */}
            {typeContent.acronyms.length > 0 && (
              <>
                <div className="border-t border-border/40 my-4"></div>
                <div className="space-y-2">
                  {typeContent.acronyms.map((acronym) => (
                    <Collapsible 
                      key={acronym} 
                      open={openSections[acronym]} 
                      onOpenChange={() => toggleSection(acronym)}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-border/40 bg-background/20 hover:bg-background/40 hover:border-primary/30 transition-all duration-200">
                        <span className="text-sm font-medium text-foreground">
                          {acronyms[acronym as keyof typeof acronyms].title}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSections[acronym] ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 px-3">
                        <p className="text-sm text-muted-foreground">
                          {acronyms[acronym as keyof typeof acronyms].content}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Container 2: Alternative Classification */}
      {subtypeContent && (
        <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-lg">
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Alternative Classification</h3>
            <p className="text-sm text-foreground">
              Based on your self-reported information, you appear to share similar symptoms with individuals who have <span className="font-semibold italic">{getSubtypeName()} PCOS</span>.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="subtype-details" className="border-none">
                <AccordionTrigger className="text-sm font-medium text-primary hover:no-underline py-2 text-left">
                  {subtypeContent.title}
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{subtypeContent.description}</p>
                  <p className="text-sm text-muted-foreground">{subtypeContent.prevalence}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Acronym definitions for this subtype */}
            {subtypeContent.acronyms.length > 0 && (
              <>
                <div className="border-t border-border/40 my-4"></div>
                <div className="space-y-2">
                  {subtypeContent.acronyms.map((acronym) => (
                    <Collapsible 
                      key={acronym} 
                      open={openSections[acronym]} 
                      onOpenChange={() => toggleSection(acronym)}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-border/40 bg-background/20 hover:bg-background/40 hover:border-primary/30 transition-all duration-200">
                        <span className="text-sm font-medium text-foreground">
                          {acronyms[acronym as keyof typeof acronyms].title}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSections[acronym] ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2 px-3">
                        <p className="text-sm text-muted-foreground">
                          {acronyms[acronym as keyof typeof acronyms].content}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Card className="bg-card/30 backdrop-blur-xl border-primary/20 shadow-lg">
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="disclaimer" className="border-none">
              <AccordionTrigger className="text-xs font-bold text-muted-foreground hover:no-underline py-0 text-left">
                DISCLAIMER
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                  The information herein is not intended or implied to be a substitute for professional medical advice, diagnosis or treatment. All content, including text, graphics, images and information, contained on or available through this web site is for general information purposes only. Neuraura Biotech Inc., makes no representation and assumes no responsibility for the accuracy of information contained on or available through this web site, and such information is subject to change without notice. You are encouraged to confirm any information obtained from or through this web site with other sources, and review all information regarding any medical condition or treatment with your physician. NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY SEEKING MEDICAL TREATMENT BECAUSE OF SOMETHING YOU HAVE READ ON OR ACCESSED HEREIN. Neuraura Biotech Inc., does not recommend, endorse or make any representation about the efficacy, appropriateness or suitability of any specific tests, products, procedures, treatments, services, opinions, health care providers or other information that may be contained on or available herein.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhenotypeResults;