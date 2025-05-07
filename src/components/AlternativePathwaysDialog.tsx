import { Dialog } from './ui/Dialog';
import Button from './ui/Button';
import { cn } from '../lib/utils';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface AlternativePathway {
    title: string;
    description: string;
    status: string;
}           

interface AlternativePathwaysDialogProps {
    isOpen: boolean;
    onClose: () => void;
    options: AlternativePathway[];
    onOptionSelect: (optionId: string) => void;
}

export function AlternativePathwaysDialog({
    isOpen,
    onClose,
    options,
    onOptionSelect
}: AlternativePathwaysDialogProps) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Alternative Pathways"
            maxWidth="2xl"
        >
            <div className="space-y-4">
                {options.map((option, idx) => (
                    <div
                        key={`alternative-${idx}`}
                        // key={option.id}
                        className={cn(
                            'p-4 rounded-lg border cursor-pointer transition-colors',
                            // option.selected
                                // ? 'border-primary-500 bg-primary-50'
                                // : 'border-secondary-200 hover:border-primary-300'
                        )}
                        // onClick={() => onOptionSelect(option.id)}
                    >
                        <div className="flex items-center justify-arround gap-2">
                            {option.status === 'Active' ? <CheckCircle className="h-5 w-5 text-green-500" /> : option.status === 'Temporarily Paused' ? <AlertTriangle className="h-5 w-5 text-yellow-500" /> : <AlertTriangle className="h-5 w-5 text-red-500" />}                            <div>
                                <h3 className="font-medium text-secondary-900">{option.title}</h3>
                                <p className={`text-sm text-secondary-600 ${option.status === 'Active' ? 'text-green-400' : option.status === 'Temporarily Paused' ? 'text-yellow-500' : 'text-red-900'}`}>
                                    {option.status}
                                </p>
                                <h4 className="mt-1 text-sm text-secondary-600">{option.description}</h4>
                            </div>
                            {/* {option.selected && (
                <div className="ml-4 flex-shrink-0">
                  <div className="h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )} */}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end">
                <Button onClick={onClose}>Close</Button>
            </div>
        </Dialog>
    );
} 