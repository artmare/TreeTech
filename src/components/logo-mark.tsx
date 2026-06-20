import Image from 'next/image';

import {cn} from '@/lib/utils';

type LogoMarkProps = {
  className?: string;
  priority?: boolean;
};

export function LogoMark({className, priority = false}: LogoMarkProps) {
  return (
    <span
      className={cn('relative block h-12 w-40 shrink-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      <Image
        src="/brand/treetech-logo.png"
        alt=""
        width={920}
        height={390}
        priority={priority}
        sizes="(max-width: 640px) 160px, 192px"
        className="h-full w-full object-contain object-left"
      />
    </span>
  );
}
