type TeamCardProps = {
    name: string;
    role: string;
    bio: string;
    imageUrl?: string;
};

export function TeamCard({ name, role, bio, imageUrl }: TeamCardProps) {
    return (
        <div className="group text-center">
            <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full border-2 border-white/10 bg-white/5 transition-all duration-300 group-hover:border-white/20">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl text-white/20">
                        {name.charAt(0)}
                    </div>
                )}
            </div>
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="mt-1 text-sm font-medium text-white/40">{role}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{bio}</p>
        </div>
    );
}
