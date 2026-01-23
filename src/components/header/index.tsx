'use client';
export function Header() {
    return (
        <header>
            <h1 
            onClick={()=> console.log('ola')}
            className="text-6xlfont-bold text-blue-500 hover:text-blue-50 hover:bg-blue-500 transition duration-1000">
                Olá Mundo
            </h1>
        </header>
    );
}