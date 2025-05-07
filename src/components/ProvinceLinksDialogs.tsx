import { Dialog } from './ui/Dialog';
import Button from './ui/Button';
import { cn } from '../lib/utils';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ProvinceLinksOption {
    title: String;
    link: String;
}

interface ProvinceLinksDialogProps {
    isOpen: boolean;
    onClose: () => void;
    options: ProvinceLinksOption[];
    onOptionSelect: (optionId: string) => void;
}

export function ProvinceLinksDialog({
    isOpen,
    onClose,
    options,
    onOptionSelect
}: ProvinceLinksDialogProps) {    
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Provincial Links"
            maxWidth="2xl"
        >
            <div className="space-y-4">
                {options.map((option, idx) => (
                    <div
                        key={"link-" + idx}
                        className={cn(
                            'p-4 rounded-lg border cursor-pointer transition-colors',
                            // option.selected
                            //     ? 'border-primary-500 bg-primary-50'
                            //     : 'border-secondary-200 hover:border-primary-300'
                        )}
                    >
                        <div className="flex items-center justify-arround gap-2">
                            <div className="w-full">
                                <h3 className="font-medium text-secondary-900 break-words">{option.title}</h3>
                                <a
                                    href={option.link as string}
                                    className="text-primary-500 underline break-all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {option.link}
                                </a>
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